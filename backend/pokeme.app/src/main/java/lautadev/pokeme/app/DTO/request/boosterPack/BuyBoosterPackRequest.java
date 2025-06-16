package lautadev.pokeme.app.DTO.request.boosterPack;

import jakarta.validation.constraints.NotNull;

public record BuyBoosterPackRequest(@NotNull Long idTypeBoosterPack,
                                    @NotNull int count) {
}
