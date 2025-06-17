package lautadev.pokeme.app.DTO.request.boosterPack;

import jakarta.validation.constraints.NotNull;

public record RenamePokemonRequest(String newName,
                                   @NotNull Long cardPokemonId,
                                   @NotNull Long pokemonId) {
}
