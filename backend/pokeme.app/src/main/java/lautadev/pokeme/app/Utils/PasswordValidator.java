package lautadev.pokeme.app.Utils;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;

public class PasswordValidator implements ConstraintValidator<Password, String> {

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {

        List<String> errors = new ArrayList<>();

        boolean containsWhitespace = !password.matches("^\\S*$");
        if (containsWhitespace) {
            errors.add("La contraseña no puede contener espacios");
        }

        if (password.length() >= 128) {
            errors.add("La contraseña debe tener menos de 128 caracteres");
        }

        if (password.length() < 8) {
            errors.add("La contraseña debe tener más de 8 caracteres");
        }

        if (!errors.isEmpty()) {
            context.disableDefaultConstraintViolation();
            for (String error : errors) {
                context.buildConstraintViolationWithTemplate(error).addConstraintViolation();
            }
            return false;
        }

        return true;
    }
}

