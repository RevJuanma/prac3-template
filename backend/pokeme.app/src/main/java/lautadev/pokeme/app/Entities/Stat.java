package lautadev.pokeme.app.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "stat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Stat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private Integer baseStat;

    private Integer effort;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_pokemon_id")
    private CardPokemon cardPokemon;
}
