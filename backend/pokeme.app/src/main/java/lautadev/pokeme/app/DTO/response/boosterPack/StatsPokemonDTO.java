package lautadev.pokeme.app.DTO.response.boosterPack;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatsPokemonDTO {

    private String name;

    private Integer baseStat;

    private Integer effort;

    private String url;
}
