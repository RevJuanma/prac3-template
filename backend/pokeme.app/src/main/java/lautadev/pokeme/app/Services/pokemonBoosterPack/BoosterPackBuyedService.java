package lautadev.pokeme.app.Services.pokemonBoosterPack;

import lautadev.pokeme.app.DTO.request.boosterPack.BuyBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPack.BoosterPackOpenResponse;
import lautadev.pokeme.app.DTO.response.boosterPack.MyBoosterPacksBuyedResponse;

import java.util.List;

public interface BoosterPackBuyedService {
    void buyBoosterPack(BuyBoosterPackRequest buyBoosterPackRequest);
    List<MyBoosterPacksBuyedResponse> getMyPacks();
    BoosterPackOpenResponse openBoosterPack(Long id);
}
