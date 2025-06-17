package lautadev.pokeme.app.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "card_pokemon")
public class CardPokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long idPokemon;

    @Column(nullable = false, precision = 38, scale = 16)
    private BigDecimal value;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String urlImage;

    @OneToMany(mappedBy = "cardPokemon", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Stat> stats = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_pokemon_id")
    private TeamPokemon teamPokemon;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "favorite_id")
    private Favorite favorite;

    @Column(nullable = false)
    private boolean isPresentFavorite;

    @Column(nullable = false)
    private boolean isDeleted;

}
