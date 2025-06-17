package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.request.boosterPack.BuyBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.BoosterPackOpenResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.MyBoosterPacksBuyedResponse;

import java.util.List;

public interface BoosterPackBuyedService {
    void buyBoosterPack(BuyBoosterPackRequest buyBoosterPackRequest);
    List<MyBoosterPacksBuyedResponse> getMyPacks();
    BoosterPackOpenResponse openBoosterPack(Long id);
}
