package lautadev.pokeme.app.DTO.request.boosterPack;

import jakarta.validation.constraints.NotNull;
import lautadev.pokeme.app.Entities.enums.Quality;

public record CreateTypeBoosterPackRequest(@NotNull Quality quality) {
}
