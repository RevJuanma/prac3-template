package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.Deck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeckRepository extends JpaRepository<Deck,Long> {
}
