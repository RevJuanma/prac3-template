package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import lautadev.pokeme.app.Entities.BoosterPackCacheEntry;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
public class BoosterPackCacheService {

    private final Cache<String, BoosterPackCacheEntry> cache;

    public BoosterPackCacheService() {
        this.cache = Caffeine.newBuilder()
                .expireAfterWrite(Duration.ofMinutes(15)) // Expired in 15 minutes
                .maximumSize(1000)
                .build();
    }

    public void put(String key, BoosterPackCacheEntry entry) {
        cache.put(key, entry);
    }

    public Optional<BoosterPackCacheEntry> get(String key) {
        return Optional.ofNullable(cache.getIfPresent(key));
    }

    public void invalidate(String key) {
        cache.invalidate(key);
    }
}
