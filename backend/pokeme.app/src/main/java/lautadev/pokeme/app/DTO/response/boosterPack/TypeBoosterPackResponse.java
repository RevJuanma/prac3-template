package lautadev.pokeme.app.DTO.response.boosterPack;

import lautadev.pokeme.app.Entities.enums.Quality;

import java.math.BigDecimal;

public record TypeBoosterPackResponse(Long id,
                                      Quality quality,
                                      int amountPokemon,
                                      BigDecimal price,
                                      boolean isDeleted) {
}
