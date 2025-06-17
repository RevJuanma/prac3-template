package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.CardPokemon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CardPokemonRepository extends JpaRepository<CardPokemon,Long> {
    Page<CardPokemon> findByInventoryId(Long inventoryId, Pageable pageable);
}
