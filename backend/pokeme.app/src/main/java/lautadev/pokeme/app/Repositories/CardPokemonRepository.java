package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.CardPokemon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface CardPokemonRepository extends JpaRepository<CardPokemon,Long> {
    Page<CardPokemon> findByInventoryId(Long inventoryId, Pageable pageable);
    @Query("SELECT COALESCE(SUM(c.value), 0) FROM CardPokemon c WHERE c.inventory.id = :inventoryId")
    BigDecimal sumValueByInventoryId(@Param("inventoryId") Long inventoryId);
}
