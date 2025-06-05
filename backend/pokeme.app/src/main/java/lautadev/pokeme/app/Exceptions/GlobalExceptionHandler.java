package lautadev.pokeme.app.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleUserNotFoundException(UserNotFoundException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.NOT_FOUND.value());
        return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<Map<String, Object>> handlerApiException(ApiException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EmailAlreadyExistException.class)
    public ResponseEntity<Map<String, Object>> handlerApiException(EmailAlreadyExistException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsInLoginException.class)
    public ResponseEntity<Map<String, Object>> handlerApiException(BadCredentialsInLoginException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<Map<String, Object>> handlerApiException(TokenExpiredException ex) {
        Map<String, Object> body = new HashMap<>();
        body.put("error", ex.getMessage());
        body.put("status", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(body, HttpStatus.UNAUTHORIZED);
    }
}
