package lautadev.pokeme.app.DTO.request.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lautadev.pokeme.app.Utils.Password;

public record UserRegisterRequest(@NotBlank String name,
                                  @NotBlank @Email String email,
                                  @Password String password) {
}
