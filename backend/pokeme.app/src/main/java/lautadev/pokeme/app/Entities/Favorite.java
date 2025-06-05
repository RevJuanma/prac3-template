package lautadev.pokeme.app.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    @OneToMany(mappedBy = "favorite", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CardPokemon> pokemons = new HashSet<>();
    private int slotUsed;
}
