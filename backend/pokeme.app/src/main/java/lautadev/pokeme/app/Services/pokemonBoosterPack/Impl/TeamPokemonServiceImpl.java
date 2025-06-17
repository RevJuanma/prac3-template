package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.StatsPokemonDTO;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.TeamPokemonDTO;
import lautadev.pokeme.app.Entities.CardPokemon;
import lautadev.pokeme.app.Entities.TeamPokemon;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Exceptions.CardPokemonNotFoundException;
import lautadev.pokeme.app.Exceptions.ResourceNotFoundException;
import lautadev.pokeme.app.Repositories.CardPokemonRepository;
import lautadev.pokeme.app.Repositories.TeamPokemonRepository;
import lautadev.pokeme.app.Services.pokemonBoosterPack.TeamPokemonService;
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
public class TeamPokemonServiceImpl implements TeamPokemonService {

    private final TeamPokemonRepository teamPokemonRepository;
    private final CardPokemonRepository cardPokemonRepository;

    @Override
    @Transactional
    public void addPokemonToTeam(Long pokemonId) {
        User user = getUserLoggedSecurityContext();

        CardPokemon cardPokemon = cardPokemonRepository.findByIdAndUserIdAndIsDeletedFalse(pokemonId, user.getId())
                .orElseThrow(CardPokemonNotFoundException::new);


        TeamPokemon teamPokemon = teamPokemonRepository.findById(user.getTeamPokemon().getId())
                .orElseThrow(ResourceNotFoundException::new);

        updateTeamPokemon(cardPokemon, teamPokemon);

        teamPokemonRepository.save(teamPokemon);
    }

    @Override
    public TeamPokemonDTO getMyTeam() {
        User user = getUserLoggedSecurityContext();

        TeamPokemon team = teamPokemonRepository.findById(user.getTeamPokemon().getId())
                .orElseThrow(ResourceNotFoundException::new);

        Set<CardPokemon> pokemon = team.getPokemons().stream()
                .filter(p -> !p.isDeleted())
                .collect(Collectors.toSet());

        List<ShowCardPokemonResponse> pokemonDtoList = pokemon.stream()
                .map(this::mapToShowCardPokemonResponse)
                .collect(Collectors.toList());

        TeamPokemonDTO dto = new TeamPokemonDTO();
        dto.setId(team.getId());
        dto.setSlotUsed(team.getSlotUsed());
        dto.setPokemon(pokemonDtoList);

        return dto;
    }

    private void updateTeamPokemon(CardPokemon cardPokemon, TeamPokemon teamPokemon) {
        boolean isPokemonPresent = teamPokemonRepository.existsCardInTeam(teamPokemon.getId(), cardPokemon.getId());

        if (isPokemonPresent) {
            teamPokemon.getPokemons().removeIf(p -> p.getId().equals(cardPokemon.getId()));
            cardPokemon.setTeamPokemon(null);
            teamPokemon.setSlotUsed(teamPokemon.getSlotUsed() - 1);
        } else {
            validateSlotInTheTeam(teamPokemon.getId());

            cardPokemon.setTeamPokemon(teamPokemon);
            teamPokemon.getPokemons().add(cardPokemon);
            teamPokemon.setSlotUsed(teamPokemon.getSlotUsed() + 1);
        }

    }

    private void validateSlotInTheTeam(Long teamId) {
        long currentCount = teamPokemonRepository.countActiveCardsInTeam(teamId);

        if (currentCount >= 6) {
            throw new ApiException("The team already has the maximum of 6 cards");
        }
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
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

}
