package lautadev.pokeme.app.Utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lautadev.pokeme.app.Exceptions.InvalidPasswordException;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        boolean containsWhitespace = !password.matches("^\\S*$");
        if (containsWhitespace) {
            throw new InvalidPasswordException("La contraseña no puede contener espacios");
        }

        if (password.length() >= 128) {
            throw new InvalidPasswordException("La contraseña debe tener menos de 128 caracteres");
        }

        if (password.length() < 8) {
            throw new InvalidPasswordException("La contraseña debe tener más de 8 caracteres");
        }

        return true;
    }
}

