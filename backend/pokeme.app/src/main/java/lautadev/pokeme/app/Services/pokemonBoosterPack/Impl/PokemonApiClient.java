package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lautadev.pokeme.app.Exceptions.ApiException;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import static lautadev.pokeme.app.Utils.Constants.BASE_URL;

@Component
public class PokemonApiClient {

    public String getOriginalNameFromPokeApi(Long idPokemon) {
        String url = BASE_URL + idPokemon;

        try {
            JsonNode root = new ObjectMapper().readTree(
                    new RestTemplate().getForObject(url, String.class)
            );
            return root.get("name").asText();
        } catch (JsonProcessingException e) {
            throw new ApiException("Error al procesar el nombre del Pokémon desde la PokeAPI");
        } catch (Exception e) {
            throw new ApiException("Error al obtener el nombre del Pokémon desde la PokeAPI");
        }
    }
}
