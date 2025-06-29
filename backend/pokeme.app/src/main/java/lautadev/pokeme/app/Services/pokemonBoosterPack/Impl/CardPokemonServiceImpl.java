package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lautadev.pokeme.app.DTO.request.boosterPack.PokemonSelectionRequest;
import lautadev.pokeme.app.DTO.request.boosterPack.RenamePokemonRequest;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.StatsPokemonDTO;
import lautadev.pokeme.app.Entities.*;
import lautadev.pokeme.app.Entities.enums.Quality;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Exceptions.CardPokemonNotFoundException;
import lautadev.pokeme.app.Repositories.CardPokemonRepository;
import lautadev.pokeme.app.Repositories.InventoryRepository;
import lautadev.pokeme.app.Services.pokemonBoosterPack.CardPokemonService;
import lautadev.pokeme.app.Services.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

import static lautadev.pokeme.app.Utils.Constants.BASE_URL;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardPokemonServiceImpl implements CardPokemonService {

    private final CardPokemonRepository cardPokemonRepository;
    private final InventoryRepository inventoryRepository;
    private final PokemonCacheService pokemonCacheService;
    private final BoosterPackCacheService boosterPackCacheService;
    private final UserService userService;
    private final PokemonApiClient pokemonApiClient;

    @Override
    @Transactional
    public void saveSelectedPokemon(PokemonSelectionRequest pokemonSelectionRequest) {
        User user = getUserLoggedSecurityContext();

        String sessionId = pokemonSelectionRequest.sessionId();
        List<Long> selectedPokemonIds = pokemonSelectionRequest.selectedPokemonIds();

        validateUniqueIds(selectedPokemonIds);

        BoosterPackCacheEntry entry = boosterPackCacheService.get(sessionId)
                .orElseThrow(() -> new ApiException("Session expired or invalid"));

        validateRequiredSelectionCount(entry,selectedPokemonIds);
        validateMaxSelectable(entry,selectedPokemonIds);
        validateIdPokemonInSelection(entry,selectedPokemonIds);

        Inventory inventory = user.getInventory();

        for (Long id : selectedPokemonIds) {
            ShowCardPokemonResponse pokemon = entry.getPokemon().stream()
                    .filter(p -> p.getIdPokemon().equals(id))
                    .findFirst()
                    .orElseThrow();

            CardPokemon card = mapToCardPokemon(pokemon, user);
            cardPokemonRepository.save(card);

            inventory.setSlotUsed(inventory.getSlotUsed() + 1);
        }
        inventoryRepository.save(inventory);

        boosterPackCacheService.invalidate(sessionId);
    }

    private CardPokemon mapToCardPokemon(ShowCardPokemonResponse showCard, User user) {
        CardPokemon card = CardPokemon.builder()
                .idPokemon(showCard.getIdPokemon())
                .value(showCard.getValue())
                .name(showCard.getName())
                .urlImage(showCard.getUrlImage())
                .isPresentFavorite(false)
                .isDeleted(false)
                .build();

        Set<Stat> stats = showCard.getStats().stream()
                .map(statDto -> {
                    Stat stat = new Stat();
                    stat.setName(statDto.getName());
                    stat.setBaseStat(statDto.getBaseStat());
                    stat.setEffort(statDto.getEffort());
                    stat.setUrl(statDto.getUrl());
                    stat.setCardPokemon(card);
                    return stat;
                })
                .collect(Collectors.toSet());

        card.setStats(stats);

        Inventory inventory = user.getInventory();
        card.setInventory(inventory);

        return card;
    }

    @Override
    public List<ShowCardPokemonResponse> loadPokemonByQualityPack(Quality quality) {
        List<Integer> validIds = pokemonCacheService.getValidPokemonIds();

        int poolSize;
        if (quality == Quality.BASIC) {
            poolSize = 5;
        } else if (quality == Quality.PREMIUM) {
            poolSize = 6;
        } else {
            throw new ApiException("Undefined Quality");
        }

        List<Integer> pool = chooseRandom(validIds, poolSize);

        return pool.stream()
                .map(this::buildShowCardPokemonResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void sellCardPokemon(Long pokemonId) {
        CardPokemon cardPokemon = cardPokemonRepository.findById(pokemonId)
                .orElseThrow(CardPokemonNotFoundException::new);

        userService.increaseBalance(cardPokemon.getValue());
        cardPokemon.setDeleted(true);
        cardPokemonRepository.save(cardPokemon);

        // TODO: Manejar los slots disponibles mediante una Query en InventoryRepository
        User user = getUserLoggedSecurityContext();
        Inventory inventory = user.getInventory();
        inventory.setSlotUsed(inventory.getSlotUsed() - 1);
        inventoryRepository.save(inventory);
    }

    @Override
    @Transactional
    public ShowCardPokemonResponse renamePokemon(RenamePokemonRequest renamePokemonRequest) {
        User user = getUserLoggedSecurityContext();

        CardPokemon cardPokemon = cardPokemonRepository.findByIdAndUserIdAndIsPresentFavoriteTrue(renamePokemonRequest.cardPokemonId(), user.getId())
                .orElseThrow(CardPokemonNotFoundException::new);

        String newName = renamePokemonRequest.newName();
        if (newName == null || newName.trim().isEmpty()) {
            newName = pokemonApiClient.getOriginalNameFromPokeApi(renamePokemonRequest.pokemonId());
        }

        cardPokemon.setName(newName);
        cardPokemonRepository.save(cardPokemon);

        return mapToShowCardPokemonResponse(cardPokemon);
    }


    private ShowCardPokemonResponse mapToShowCardPokemonResponse(CardPokemon card) {
        ShowCardPokemonResponse dto = new ShowCardPokemonResponse();
        dto.setId(card.getId());
        dto.setIdPokemon(card.getIdPokemon());
        dto.setValue(card.getValue());
        dto.setName(card.getName());
        dto.setPresentFavorite(card.isPresentFavorite());
        dto.setUrlImage(card.getUrlImage());

        Set<StatsPokemonDTO> statsDtos = card.getStats().stream()
                .map(stat -> {
                    StatsPokemonDTO statDto = new StatsPokemonDTO();
                    statDto.setName(stat.getName());
                    statDto.setBaseStat(stat.getBaseStat());
                    statDto.setEffort(stat.getEffort());
                    statDto.setUrl(stat.getUrl());
                    return statDto;
                })
                .collect(Collectors.toSet());

        dto.setStats(statsDtos);
        return dto;
    }

    private List<Integer> chooseRandom(List<Integer> list, int count) {
        Collections.shuffle(list);
        return list.stream().limit(count).collect(Collectors.toList());
    }

    private ShowCardPokemonResponse buildShowCardPokemonResponse(Integer idPokemon) {
        String url = BASE_URL + idPokemon;

        try {
            JsonNode root = new ObjectMapper().readTree(new RestTemplate().getForObject(url, String.class));

            String name = root.get("name").asText();
            String urlImage = root.get("sprites").get("front_default").asText();

            Set<StatsPokemonDTO> stats = new HashSet<>();
            for (JsonNode statNode : root.get("stats")) {
                String statName = statNode.get("stat").get("name").asText();
                int baseStat = statNode.get("base_stat").asInt();
                int effort = statNode.get("effort").asInt();
                String statUrl = statNode.get("stat").get("url").asText();
                stats.add(new StatsPokemonDTO(statName, baseStat, effort, statUrl));
            }

            ShowCardPokemonResponse response = new ShowCardPokemonResponse(
                    idPokemon.longValue(),
                    generateRandomValue(),
                    name,
                    urlImage,
                    stats
            );
            log.debug("Construido ShowCardPokemonResponse para id {} con nombre {}", idPokemon, name);
            return response;
        } catch (JsonProcessingException e) {
            log.error("Error procesando JSON para el pokemon id {}: ", idPokemon, e);
            throw new ApiException("Error processing data of Pokémon");
        } catch (Exception e) {
            log.error("Error inesperado para el pokemon id {}: ", idPokemon, e);
            throw new ApiException("Error processing data of Pokémon");
        }
    }


    private BigDecimal generateRandomValue() {
        int randomValue = ThreadLocalRandom.current().nextInt(1, 1001);
        return BigDecimal.valueOf(randomValue);
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private void validateMaxSelectable(BoosterPackCacheEntry entry, List<Long> selectedPokemonIds) {
        int maxSelectable = entry.getQuality() == Quality.BASIC ? 1 : 2;
        if (selectedPokemonIds.size() > maxSelectable) {
            throw new ApiException("Selection exceeds allowed number for this booster quality");
        }
    }

    private void validateIdPokemonInSelection(BoosterPackCacheEntry entry, List<Long> selectedPokemonIds) {
        Set<Long> validIds = entry.getPokemon().stream()
                .map(ShowCardPokemonResponse::getIdPokemon)
                .collect(Collectors.toSet());

        for (Long id : selectedPokemonIds) {
            if (!validIds.contains(id)) {
                throw new ApiException("Invalid Pokémon selection");
            }
        }
    }

    private void validateUniqueIds(List<Long> selectedPokemonIds) {
        Set<Long> uniqueIds = new HashSet<>(selectedPokemonIds);
        if (uniqueIds.size() < selectedPokemonIds.size()) {
            throw new ApiException("Duplicate Pokémon selections are not allowed.");
        }
    }

    private void validateRequiredSelectionCount(BoosterPackCacheEntry entry,List<Long> selectedPokemonIds) {
        int requiredSelectionCount;

        if (entry.getQuality() == Quality.BASIC) {
            requiredSelectionCount = 1;
        } else if (entry.getQuality() == Quality.PREMIUM) {
            requiredSelectionCount = 2;
        } else {
            throw new ApiException("Undefined Quality");
        }

        if (selectedPokemonIds.size() != requiredSelectionCount) {
            throw new ApiException("You must select exactly " + requiredSelectionCount + " Pokémon(s) for this booster pack.");
        }
    }
}
