package lautadev.pokeme.app.Services.customer;

import lautadev.pokeme.app.DTO.response.customer.UserDetails;

public interface UserService {
    UserDetails findUserById(Long id);
    UserDetails getUserLogged();
}
