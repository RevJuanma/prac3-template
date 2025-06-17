package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.TeamPokemon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamPokemonRepository extends JpaRepository<TeamPokemon,Long> {
    @Query("SELECT COUNT(cp) > 0 FROM CardPokemon cp WHERE cp.teamPokemon.id = :teamId AND cp.id = :cardPokemonId AND cp.isDeleted = false")
    boolean existsCardInTeam(@Param("teamId") Long teamId, @Param("cardPokemonId") Long cardPokemonId);

    @Query("SELECT COUNT(cp) FROM CardPokemon cp WHERE cp.teamPokemon.id = :teamId AND cp.isDeleted = false")
    long countActiveCardsInTeam(@Param("teamId") Long teamId);
}
