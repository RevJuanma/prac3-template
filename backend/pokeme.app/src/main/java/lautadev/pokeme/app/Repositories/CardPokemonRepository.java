package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.CardPokemon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface CardPokemonRepository extends JpaRepository<CardPokemon,Long> {
    Page<CardPokemon> findByInventoryIdAndIsDeletedFalse(Long inventoryId, Pageable pageable);
    @Query("SELECT COALESCE(SUM(c.value), 0) FROM CardPokemon c WHERE c.inventory.id = :inventoryId AND c.isDeleted = false")
    BigDecimal sumValueByInventoryId(@Param("inventoryId") Long inventoryId);

    @Query("SELECT cp FROM CardPokemon cp WHERE cp.id = :id AND cp.isDeleted = false AND cp.inventory.user.id = :userId")
    Optional<CardPokemon> findByIdAndUserIdAndIsDeletedFalse(@Param("id") Long id, @Param("userId") Long userId);

    @Query("""
    SELECT cp FROM CardPokemon cp 
    WHERE cp.id = :id 
      AND cp.isDeleted = false 
      AND cp.isPresentFavorite = true 
      AND cp.inventory.user.id = :userId
    """)
    Optional<CardPokemon> findByIdAndUserIdAndIsPresentFavoriteTrue(@Param("id") Long id, @Param("userId") Long userId);


}
