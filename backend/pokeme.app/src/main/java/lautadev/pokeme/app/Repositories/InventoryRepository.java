package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
}
