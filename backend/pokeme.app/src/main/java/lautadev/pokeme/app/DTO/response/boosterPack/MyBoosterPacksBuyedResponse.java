package lautadev.pokeme.app.DTO.response.boosterPack;

import lautadev.pokeme.app.Entities.enums.Quality;

public record MyBoosterPacksBuyedResponse(Long id,
                                          Quality quality,
                                          int amountPokemon,
                                          int count,
                                          boolean isDeleted) {
}
