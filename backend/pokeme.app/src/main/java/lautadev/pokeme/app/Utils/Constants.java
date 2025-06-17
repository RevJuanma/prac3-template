package lautadev.pokeme.app.Utils;

import java.util.Set;

public class Constants {

    private Constants() {
    }

    public static final Set<String> UNPROTECTED_PATHS = Set.of(
            "api/v1/authentication/register",
            "api/v1/authentication/login",
            "api/v1/authentication/logout",
            "api/v1/authentication/refresh-token",
            "api/v1/handler/webhook",
            "api/v1/type-booster-pack",
            "api/v1/type-booster-pack/create"
    );

    public static final String BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

    public static final String GET_POKEMON_COUNT = BASE_URL + "?limit=1";

    public static final String ALL_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000";
}
