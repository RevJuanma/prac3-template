package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.request.boosterPack.CreateTypeBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.TypeBoosterPackResponse;

import java.util.List;

public interface TypeBoosterPackService {
    void createTypeBoosterPack(CreateTypeBoosterPackRequest createTypeBoosterPackRequest);
    List<TypeBoosterPackResponse> getBoosterPacks();
}
