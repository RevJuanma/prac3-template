package lautadev.pokeme.app.DTO.response.boosterPack;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BoosterPackOpenResponse {
    private String sessionId;
    private List<ShowCardPokemonResponse> pokemons;
}
