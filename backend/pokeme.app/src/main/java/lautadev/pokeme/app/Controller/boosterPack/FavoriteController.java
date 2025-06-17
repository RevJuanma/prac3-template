package lautadev.pokeme.app.Controller.boosterPack;

import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.FavoriteDTO;
import lautadev.pokeme.app.Services.pokemonBoosterPack.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/favorite")
public class FavoriteController {

    private final FavoriteService favoriteService;

    @PostMapping("/add/pokemon/{id}")
    public ResponseEntity<GenericResponse> updateFavoriteList(@PathVariable Long id) {
        favoriteService.addPokemonToFavorite(id);
        return ResponseEntity.ok(new GenericResponse("List update"));
    }

    @GetMapping
    public ResponseEntity<FavoriteDTO> myFavoriteList() {
        return ResponseEntity.ok(favoriteService.getMyFavoritePokemon());
    }
}
