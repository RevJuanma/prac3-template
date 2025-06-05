package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long> {
}
