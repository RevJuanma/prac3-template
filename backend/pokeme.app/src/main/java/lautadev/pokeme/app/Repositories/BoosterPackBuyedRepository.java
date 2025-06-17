package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.BoosterPackBuyed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoosterPackBuyedRepository extends JpaRepository<BoosterPackBuyed,Long> {
    @Query("SELECT b FROM BoosterPackBuyed b WHERE b.count <> 0 AND b.user.id = :userId")
    List<BoosterPackBuyed> findByUserIdAndCountNotZero(@Param("userId") Long userId);
    @Query("SELECT b FROM BoosterPackBuyed b WHERE b.id = :id AND b.count <> 0 AND b.user.id = :userId")
    Optional<BoosterPackBuyed> findByIdAndUserIdAndCountNotZero(@Param("id") Long id, @Param("userId") Long userId);

}
