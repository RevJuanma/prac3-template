package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.TypeBoosterPack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TypeBoosterPackRepository extends JpaRepository<TypeBoosterPack,Long> {
    List<TypeBoosterPack> findByIsDeletedFalse();
    Optional<TypeBoosterPack> findByIdAndIsDeletedFalse(Long id);
}
