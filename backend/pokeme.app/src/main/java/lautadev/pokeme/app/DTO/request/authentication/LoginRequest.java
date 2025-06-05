package lautadev.pokeme.app.DTO.request.authentication;

import jakarta.validation.constraints.NotBlank;
import lautadev.pokeme.app.Utils.Password;

public record LoginRequest(@NotBlank String identifier,
                           @Password String password) {
}
