package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.TypeBoosterPack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeBoosterPackRepository extends JpaRepository<TypeBoosterPack,Long> {
    List<TypeBoosterPack> findByIsDeletedFalse();
}
