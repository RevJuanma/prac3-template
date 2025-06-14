package lautadev.pokeme.app.DTO.response.customer;

import java.math.BigDecimal;

public record UserDetails(String name,
                          String email,
                          BigDecimal balance) {
}
