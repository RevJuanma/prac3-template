package lautadev.pokeme.app.Entities;

import jakarta.persistence.*;
import lautadev.pokeme.app.Entities.enums.Quality;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypeBoosterPack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Quality quality;
    @Column(nullable = false)
    private int amountPokemon;
    @Column(nullable = false, precision = 38, scale = 16)
    private BigDecimal price;
    @OneToMany(mappedBy = "typeBoosterPack",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BoosterPackBuyed> boosterPackBuyed;
    @Column(nullable = false)
    private boolean isDeleted;

}
