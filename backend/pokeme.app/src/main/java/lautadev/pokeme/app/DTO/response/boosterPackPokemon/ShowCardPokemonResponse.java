package lautadev.pokeme.app.DTO.response.boosterPackPokemon;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ShowCardPokemonResponse {

    private Long id;

    private Long idPokemon;

    private BigDecimal value;

    private String name;

    private String urlImage;

    private boolean isPresentFavorite;

    private Set<StatsPokemonDTO> stats = new HashSet<>();

    public ShowCardPokemonResponse(long id, BigDecimal value, String name, String urlImage, boolean isFavorite ,Set<StatsPokemonDTO> stats) {
        this.idPokemon = id;
        this.value = value;
        this.name = name;
        this.urlImage = urlImage;
        this.isPresentFavorite =  isFavorite;
        this.stats = stats;
    }

    public ShowCardPokemonResponse(long id, BigDecimal value, String name, String urlImage, Set<StatsPokemonDTO> stats) {
        this.idPokemon = id;
        this.value = value;
        this.name = name;
        this.urlImage = urlImage;
        this.stats = stats;
    }
}
