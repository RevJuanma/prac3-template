package lautadev.pokeme.app.Controller.boosterPack;

import jakarta.validation.Valid;
import lautadev.pokeme.app.DTO.request.boosterPack.CreateTypeBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.boosterPack.TypeBoosterPackResponse;
import lautadev.pokeme.app.Services.boosterPack.TypeBoosterPackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/type-booster-pack")
public class TypeBoosterPackController {

    private final TypeBoosterPackService typeBoosterPackService;

    @PostMapping("/create")
    public ResponseEntity<GenericResponse> createTypeBoosterPack(@RequestBody @Valid
                                                                     CreateTypeBoosterPackRequest createTypeBoosterPackRequest) {
        typeBoosterPackService.createTypeBoosterPack(createTypeBoosterPackRequest);
        return ResponseEntity.ok(new GenericResponse("Type Booster Pack create"));
    }

    @GetMapping
    public ResponseEntity<List<TypeBoosterPackResponse>> getBoosterPacks() {
        return ResponseEntity.ok(typeBoosterPackService.getBoosterPacks());
    }
}
