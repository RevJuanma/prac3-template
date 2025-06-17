package lautadev.pokeme.app.Controller.boosterPack;

import jakarta.validation.Valid;
import lautadev.pokeme.app.DTO.request.boosterPack.PokemonSelectionRequest;
import lautadev.pokeme.app.DTO.request.boosterPack.RenamePokemonRequest;
import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.Services.pokemonBoosterPack.CardPokemonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/card-pokemon")
public class CardPokemonController {

    private final CardPokemonService cardPokemonService;

    @PostMapping("/select")
    public ResponseEntity<GenericResponse> selectPokemon(@RequestBody @Valid
                                                             PokemonSelectionRequest pokemonSelectionRequest) {
        cardPokemonService.saveSelectedPokemon(pokemonSelectionRequest);
        return ResponseEntity.ok(new GenericResponse("Selected Pokémon successfully"));
    }

    @DeleteMapping("/sell/{id}")
    public ResponseEntity<GenericResponse> sellCardPokemon(@PathVariable Long id) {
        cardPokemonService.sellCardPokemon(id);
        return ResponseEntity.ok(new GenericResponse("Sold Pokémon successfully"));
    }

    @PatchMapping("/rename")
    public ResponseEntity<ShowCardPokemonResponse> renamePokemon(@RequestBody @Valid RenamePokemonRequest renamePokemonRequest) {
        return ResponseEntity.ok(cardPokemonService.renamePokemon(renamePokemonRequest));
    }
}
