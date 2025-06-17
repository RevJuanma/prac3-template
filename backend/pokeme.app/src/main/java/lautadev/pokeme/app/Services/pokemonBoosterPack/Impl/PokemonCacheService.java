package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.LoadingCache;
import jakarta.annotation.PostConstruct;
import lautadev.pokeme.app.Exceptions.ApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import static lautadev.pokeme.app.Utils.Constants.ALL_POKEMON_URL;

@Service
@Slf4j
public class PokemonCacheService {

    private LoadingCache<String, List<Integer>> validIdsCache;
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        validIdsCache = Caffeine.newBuilder()
                .expireAfterWrite(12, TimeUnit.HOURS)
                .build(key -> fetchValidPokemonIdsFromApi());
        try {
            validIdsCache.get("valid_pokemon_ids");
        } catch (Exception e) {
            log.error("Failed to load Pokémon IDs cache at startup", e);
        }
    }

    public List<Integer> getValidPokemonIds() {
        try {
            List<Integer> validIds = validIdsCache.get("valid_pokemon_ids");
            if (validIds == null || validIds.isEmpty()) {
                throw new ApiException("There are no valid IDs loaded in cache");
            }
            return validIds;
        } catch (RuntimeException e) {
            log.error("Error retrieving valid Pokémon IDs from cache", e);
            throw e;
        }
    }

    private List<Integer> fetchValidPokemonIdsFromApi() {
        try {
            String response = restTemplate.getForObject(ALL_POKEMON_URL, String.class);
            JsonNode root = objectMapper.readTree(response);
            List<Integer> ids = new ArrayList<>();
            for (JsonNode resultNode : root.get("results")) {
                String pokemonUrl = resultNode.get("url").asText();
                String[] parts = pokemonUrl.split("/");
                String idStr = parts[parts.length - 1].isEmpty() ? parts[parts.length - 2] : parts[parts.length - 1];
                int id = Integer.parseInt(idStr);
                ids.add(id);
            }
            log.info("Fetched {} valid Pokémon IDs from API", ids.size());
            return ids;
        } catch (Exception e) {
            log.error("Error fetching valid Pokémon IDs from API", e);
            throw new RuntimeException("Error fetching valid Pokémon IDs", e);
        }
    }
}
