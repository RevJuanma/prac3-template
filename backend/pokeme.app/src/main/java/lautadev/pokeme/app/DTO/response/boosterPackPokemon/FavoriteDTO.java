package lautadev.pokeme.app.DTO.response.boosterPackPokemon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FavoriteDTO {

    private Long id;

    private int slotUsed;

    private List<ShowCardPokemonResponse> pokemon;
}
