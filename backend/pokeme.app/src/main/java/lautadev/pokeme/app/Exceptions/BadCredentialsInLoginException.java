package lautadev.pokeme.app.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class BadCredentialsInLoginException extends RuntimeException {
    public BadCredentialsInLoginException(){
        super("Credenciales Incorrectas");
    }
}
