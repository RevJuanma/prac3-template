package lautadev.pokeme.app.DTO.request.boosterPack;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PokemonSelectionRequest(@NotBlank String sessionId,
                                      @NotNull List<Long> selectedPokemonIds) {
}
