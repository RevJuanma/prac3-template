package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.response.boosterPackPokemon.TeamPokemonDTO;

public interface TeamPokemonService {
    void addPokemonToTeam(Long pokemonId);
    TeamPokemonDTO getMyTeam();
}
