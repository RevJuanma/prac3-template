package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.response.boosterPackPokemon.FavoriteDTO;

public interface FavoriteService {
    void addPokemonToFavorite(Long pokemonId);
    FavoriteDTO getMyFavoritePokemon();
}
