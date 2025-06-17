package lautadev.pokeme.app.Controller.boosterPack;

import jakarta.validation.Valid;
import lautadev.pokeme.app.DTO.request.boosterPack.BuyBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.BoosterPackOpenResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.MyBoosterPacksBuyedResponse;
import lautadev.pokeme.app.Services.pokemonBoosterPack.BoosterPackBuyedService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/booster-pack")
public class BoosterPackBuyedController {

    private final BoosterPackBuyedService boosterPackBuyedService;

    @PostMapping("/buy")
    public ResponseEntity<GenericResponse> buyBoosterPack(@RequestBody  @Valid BuyBoosterPackRequest buyBoosterPackRequest)  {
        boosterPackBuyedService.buyBoosterPack(buyBoosterPackRequest);
        return ResponseEntity.ok(new GenericResponse("Booster pack buy successfully"));
    }

    @GetMapping
    public ResponseEntity<List<MyBoosterPacksBuyedResponse>> getMyPacks() {
        return ResponseEntity.ok(boosterPackBuyedService.getMyPacks());
    }

    @PostMapping("/{id}/open")
    public ResponseEntity<BoosterPackOpenResponse> openBoosterPack(@PathVariable Long id) {
        return ResponseEntity.ok(boosterPackBuyedService.openBoosterPack(id));
    }
}
