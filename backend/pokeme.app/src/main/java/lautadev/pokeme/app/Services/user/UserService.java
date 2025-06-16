package lautadev.pokeme.app.Services.user;

import lautadev.pokeme.app.DTO.response.user.UserDetails;

public interface UserService {
    UserDetails findUserById(Long id);
    UserDetails getUserLogged();
}
