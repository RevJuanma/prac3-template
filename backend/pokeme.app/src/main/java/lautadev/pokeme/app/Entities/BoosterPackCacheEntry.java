package lautadev.pokeme.app.Entities;

import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.Entities.enums.Quality;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoosterPackCacheEntry {
    private List<ShowCardPokemonResponse> pokemon;
    private Quality quality;
}
