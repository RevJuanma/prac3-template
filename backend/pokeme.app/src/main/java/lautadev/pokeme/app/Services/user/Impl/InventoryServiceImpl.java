package lautadev.pokeme.app.Services.user.Impl;

import lautadev.pokeme.app.DTO.response.boosterPack.ShowCardPokemonResponse;
import lautadev.pokeme.app.DTO.response.boosterPack.StatsPokemonDTO;
import lautadev.pokeme.app.DTO.response.user.InventoryDTO;
import lautadev.pokeme.app.Entities.CardPokemon;
import lautadev.pokeme.app.Entities.Inventory;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Exceptions.InventoryNotFoundException;
import lautadev.pokeme.app.Repositories.CardPokemonRepository;
import lautadev.pokeme.app.Repositories.InventoryRepository;
import lautadev.pokeme.app.Services.user.InventoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final CardPokemonRepository cardPokemonRepository;

    @Override
    public InventoryDTO myInventory(Pageable pageable) {
        User user = getUserLoggedSecurityContext();

        log.warn("Hasta aca llega myInventory");

        Inventory inventory  = inventoryRepository.findByUserId(user.getId())
                .orElseThrow(InventoryNotFoundException::new);

        log.warn("Inventory ID para consulta de pokemons: {}", inventory.getId());

        Page<CardPokemon> page = cardPokemonRepository.findByInventoryId(inventory.getId(), pageable);

        log.warn("Cantidad de pokemons paginados: {}", page.getNumberOfElements());

        return buildInventoryDTOResponse(inventory,page);
    }

    private InventoryDTO buildInventoryDTOResponse(Inventory inventory, Page<CardPokemon> page) {
        List<ShowCardPokemonResponse> pokemonDtoList = page.stream()
                .map(this::mapToShowCardPokemonResponse)
                .collect(Collectors.toList());

        InventoryDTO dto = new InventoryDTO();
        dto.setId(inventory.getId());
        dto.setSlotUsed(inventory.getSlotUsed());
        dto.setPokemon(pokemonDtoList);

        return dto;
    }

    private ShowCardPokemonResponse mapToShowCardPokemonResponse(CardPokemon card) {
        ShowCardPokemonResponse dto = new ShowCardPokemonResponse();
        dto.setId(card.getId());
        dto.setIdPokemon(card.getIdPokemon());
        dto.setValue(card.getValue());
        dto.setName(card.getName());
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

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
