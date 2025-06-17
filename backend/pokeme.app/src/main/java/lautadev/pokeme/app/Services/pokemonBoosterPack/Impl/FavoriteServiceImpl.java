package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import lautadev.pokeme.app.DTO.response.boosterPackPokemon.FavoriteDTO;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.StatsPokemonDTO;
import lautadev.pokeme.app.Entities.CardPokemon;
import lautadev.pokeme.app.Entities.Favorite;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Exceptions.CardPokemonNotFoundException;
import lautadev.pokeme.app.Repositories.CardPokemonRepository;
import lautadev.pokeme.app.Repositories.FavoriteRepository;
import lautadev.pokeme.app.Services.pokemonBoosterPack.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final CardPokemonRepository cardPokemonRepository;
    private final PokemonApiClient pokemonApiClient;

    @Override
    @Transactional
    public void addPokemonToFavorite(Long pokemonId) {
        User user = getUserLoggedSecurityContext();

        CardPokemon cardPokemon = cardPokemonRepository.findByIdAndUserIdAndIsDeletedFalse(pokemonId, user.getId())
                .orElseThrow(CardPokemonNotFoundException::new);

        Favorite favorite = favoriteRepository.findById(user.getFavorite().getId())
                .orElseThrow(CardPokemonNotFoundException::new);

        updateFavoriteList(cardPokemon, favorite);

        favoriteRepository.save(favorite);
    }

    @Override
    public FavoriteDTO getMyFavoritePokemon() {
        User user = getUserLoggedSecurityContext();

        Favorite favorite = favoriteRepository.findById(user.getFavorite().getId())
                .orElseThrow(CardPokemonNotFoundException::new);

        Set<CardPokemon> pokemon = favorite.getPokemons().stream()
                .filter(p -> !p.isDeleted())
                .collect(Collectors.toSet());

        List<ShowCardPokemonResponse> pokemonDtoList = pokemon.stream()
                .map(this::mapToShowCardPokemonResponse)
                .collect(Collectors.toList());

        FavoriteDTO dto = new FavoriteDTO();
        dto.setId(favorite.getId());
        dto.setSlotUsed(favorite.getSlotUsed());
        dto.setPokemon(pokemonDtoList);

        return dto;
    }

    private void updateFavoriteList(CardPokemon cardPokemon, Favorite favorite) {
        boolean isPokemonPresent = favoriteRepository.existsCardInFavorite(favorite.getId(), cardPokemon.getId());

        if (isPokemonPresent) {
            String originalName = pokemonApiClient.getOriginalNameFromPokeApi(cardPokemon.getIdPokemon());
            cardPokemon.setName(originalName);

            favorite.getPokemons().removeIf(p -> p.getId().equals(cardPokemon.getId()));
            cardPokemon.setFavorite(null);
            cardPokemon.setPresentFavorite(false);
            favorite.setSlotUsed(favorite.getSlotUsed() - 1);
        } else {
            validateSlotInFavoriteList(favorite.getId());

            cardPokemon.setFavorite(favorite);
            favorite.getPokemons().add(cardPokemon);
            cardPokemon.setPresentFavorite(true);
            favorite.setSlotUsed(favorite.getSlotUsed() + 1);
        }
    }

    private ShowCardPokemonResponse mapToShowCardPokemonResponse(CardPokemon card) {
        ShowCardPokemonResponse dto = new ShowCardPokemonResponse();
        dto.setId(card.getId());
        dto.setIdPokemon(card.getIdPokemon());
        dto.setValue(card.getValue());
        dto.setName(card.getName());
        dto.setFavorite(card.isPresentFavorite());
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

    private void validateSlotInFavoriteList(Long favoriteId) {
        long currentCount = favoriteRepository.countActiveCardsInFavorite(favoriteId);

        if (currentCount >= 10) {
            throw new ApiException("The favorite list has the maximum of 10 cards");
        }
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }
}
