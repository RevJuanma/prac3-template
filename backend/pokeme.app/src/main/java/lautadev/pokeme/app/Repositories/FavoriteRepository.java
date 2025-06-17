package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
    @Query("SELECT COUNT(cp) > 0 FROM CardPokemon cp WHERE cp.favorite.id = :favoriteId AND cp.id = :cardPokemonId AND cp.isDeleted = false")
    boolean existsCardInFavorite(@Param("favoriteId") Long favoriteId, @Param("cardPokemonId") Long cardPokemonId);

    @Query("SELECT COUNT(cp) FROM CardPokemon cp WHERE cp.favorite.id = :favoriteId AND cp.isDeleted = false")
    long countActiveCardsInFavorite(@Param("favoriteId") Long favoriteId);

}
