package lautadev.pokeme.app.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CardPokemonNotFoundException extends RuntimeException {
    public CardPokemonNotFoundException() {
        super("Card Pokémon not found");
    }
}
