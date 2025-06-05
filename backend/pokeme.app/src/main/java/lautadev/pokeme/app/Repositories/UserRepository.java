package lautadev.pokeme.app.Repositories;

import lautadev.pokeme.app.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmailIgnoreCase(String email);
    Optional<User> findByEmail(String username);
    User getReferenceByEmailIgnoreCase(String email);
    @Query("SELECT u FROM User u WHERE u.id = :id AND u.isDeleted = false")
    Optional<User> findByIdAndIsNotDeleted(@Param("id") Long id);
}
