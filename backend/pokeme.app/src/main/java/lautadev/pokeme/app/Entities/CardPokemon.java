package lautadev.pokeme.app.Entities;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CardPokemon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCustom;
    @Column(nullable = false)
    private Long idPokemon;
    private String rename;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "inventory_id")
    private Inventory inventory;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deck_id")
    private Deck deck;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "favorite_id")
    private Favorite favorite;
    @Column(nullable = false)
    private boolean isFavorite;
    @Column(nullable = false)
    private boolean isDeleted;

}
