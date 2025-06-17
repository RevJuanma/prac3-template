package lautadev.pokeme.app.Controller.boosterPack;

import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.TeamPokemonDTO;
import lautadev.pokeme.app.Services.pokemonBoosterPack.TeamPokemonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/team-pokemon")
public class TeamPokemonController {

    private final TeamPokemonService teamPokemonService;

    @PostMapping("/add/pokemon/{id}")
    public ResponseEntity<GenericResponse> updateTeamPokemon(@PathVariable Long id) {
        teamPokemonService.addPokemonToTeam(id);
        return ResponseEntity.ok(new GenericResponse("Update Team"));
    }

    @GetMapping
    public ResponseEntity<TeamPokemonDTO> myTeam() {
        return ResponseEntity.ok(teamPokemonService.getMyTeam());
    }
}
