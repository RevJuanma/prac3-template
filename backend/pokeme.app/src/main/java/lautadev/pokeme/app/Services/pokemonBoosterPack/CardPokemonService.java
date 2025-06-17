package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.request.boosterPack.PokemonSelectionRequest;
import lautadev.pokeme.app.DTO.response.boosterPack.ShowCardPokemonResponse;
import lautadev.pokeme.app.Entities.enums.Quality;

import java.util.List;

public interface CardPokemonService {
    void saveSelectedPokemon(PokemonSelectionRequest pokemonSelectionRequest);
    List<ShowCardPokemonResponse> loadPokemonByQualityPack(Quality quality);
}
