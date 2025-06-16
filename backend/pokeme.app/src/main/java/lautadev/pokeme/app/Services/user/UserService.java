package lautadev.pokeme.app.Services.user;

import lautadev.pokeme.app.DTO.response.user.UserDetails;

import java.math.BigDecimal;

public interface UserService {
    UserDetails findUserById(Long id);
    UserDetails getUserLogged();
    void withdrawBalance(BigDecimal amount);
    void increaseBalance(BigDecimal amount);
}
