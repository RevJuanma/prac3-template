package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory,Long> {
    Optional<Inventory> findByUserId(Long userId);
    @Query("SELECT CASE WHEN i.slotUsed + :newSlots <= 50 THEN true ELSE false END FROM Inventory i WHERE i.user.id = :userId")
    boolean hasEnoughSlots(@Param("userId") Long userId, @Param("newSlots") int newSlots);
}
