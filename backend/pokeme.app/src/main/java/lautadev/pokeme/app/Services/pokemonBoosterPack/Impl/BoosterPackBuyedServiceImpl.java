package lautadev.pokeme.app.Services.pokemonBoosterPack.Impl;

import lautadev.pokeme.app.DTO.request.boosterPack.BuyBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.BoosterPackOpenResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.MyBoosterPacksBuyedResponse;
import lautadev.pokeme.app.DTO.response.boosterPackPokemon.ShowCardPokemonResponse;
import lautadev.pokeme.app.Entities.BoosterPackBuyed;
import lautadev.pokeme.app.Entities.BoosterPackCacheEntry;
import lautadev.pokeme.app.Entities.TypeBoosterPack;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Entities.enums.Quality;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Repositories.BoosterPackBuyedRepository;
import lautadev.pokeme.app.Repositories.InventoryRepository;
import lautadev.pokeme.app.Repositories.TypeBoosterPackRepository;
import lautadev.pokeme.app.Services.pokemonBoosterPack.BoosterPackBuyedService;
import lautadev.pokeme.app.Services.pokemonBoosterPack.CardPokemonService;
import lautadev.pokeme.app.Services.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoosterPackBuyedServiceImpl implements BoosterPackBuyedService {

    private final BoosterPackBuyedRepository boosterPackBuyedRepository;
    private final BoosterPackCacheService boosterPackCacheService;
    private final TypeBoosterPackRepository typeBoosterPackRepository;
    private final CardPokemonService cardPokemonService;
    private final InventoryRepository inventoryRepository;
    private final UserService userService;

    @Override
    @Transactional
    public void buyBoosterPack(BuyBoosterPackRequest buyBoosterPackRequest) {
        User user = getUserLoggedSecurityContext();
        buildBuyBoosterPack(buyBoosterPackRequest,user);
    }

    @Override
    public List<MyBoosterPacksBuyedResponse> getMyPacks() {
        User user = getUserLoggedSecurityContext();
        List<BoosterPackBuyed> boosterPackPurchased = boosterPackBuyedRepository.findByUserIdAndCountNotZero(user.getId());
        return buildMyBoosterPacksBoughtResponse(boosterPackPurchased);
    }

    @Override
    @Transactional
    public BoosterPackOpenResponse openBoosterPack(Long id) {
        User user = getUserLoggedSecurityContext();
        BoosterPackBuyed boosterPackBuyed = boosterPackBuyedRepository.findByIdAndUserIdAndCountNotZero(id,user.getId())
                .orElseThrow(()-> new ApiException("Booster pack not found"));

        validateSlotInInventory(user.getId(),boosterPackBuyed.getTypeBoosterPack().getQuality());

        List<ShowCardPokemonResponse> showCardPokemonResponses = cardPokemonService.loadPokemonByQualityPack(boosterPackBuyed.getTypeBoosterPack().getQuality());

        String sessionId = addPokemonListInCache(user,boosterPackBuyed,showCardPokemonResponses);

        updateCountBoosterPackUsed(boosterPackBuyed);

        return new BoosterPackOpenResponse(sessionId, showCardPokemonResponses);
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private List<MyBoosterPacksBuyedResponse> buildMyBoosterPacksBoughtResponse(List<BoosterPackBuyed> boosterPackPurchased) {
        return boosterPackPurchased.stream()
                .map(bp -> new MyBoosterPacksBuyedResponse(
                        bp.getId(),
                        bp.getTypeBoosterPack().getQuality(),
                        bp.getTypeBoosterPack().getAmountPokemon(),
                        bp.getCount(),
                        bp.getTypeBoosterPack().isDeleted()
                ))
                .toList();
    }

    private void buildBuyBoosterPack(BuyBoosterPackRequest buyBoosterPackRequest, User user) {
        TypeBoosterPack typeBoosterPack = typeBoosterPackRepository.findByIdAndIsDeletedFalse(buyBoosterPackRequest.idTypeBoosterPack())
                .orElseThrow(()-> new ApiException("Stock no available"));

        BigDecimal unitPriceBoosterPack = typeBoosterPack.getPrice();
        BigDecimal total = unitPriceBoosterPack.multiply(BigDecimal.valueOf(buyBoosterPackRequest.count()));

        userService.withdrawBalance(total);

        BoosterPackBuyed boosterPackBuyed = BoosterPackBuyed.builder()
                                            .count(buyBoosterPackRequest.count())
                                            .user(user)
                                            .typeBoosterPack(typeBoosterPack)
                                            .build();

        boosterPackBuyedRepository.save(boosterPackBuyed);
    }

    private void updateCountBoosterPackUsed(BoosterPackBuyed boosterPackBuyed) {
        int newCount = boosterPackBuyed.getCount() - 1;
        boosterPackBuyed.setCount(newCount);
        boosterPackBuyedRepository.save(boosterPackBuyed);
    }

    private String addPokemonListInCache(User user, BoosterPackBuyed boosterPackBuyed, List<ShowCardPokemonResponse> showCardPokemonResponses) {
        String sessionId = user.getId() + ":" + boosterPackBuyed.getId();
        boosterPackCacheService.put(sessionId, new BoosterPackCacheEntry(showCardPokemonResponses, boosterPackBuyed.getTypeBoosterPack().getQuality()));
        return sessionId;
    }

    private void validateSlotInInventory(Long userId, Quality quality) {
        int necessarySlots;

        if (quality == Quality.BASIC) {
            necessarySlots = 1;
        } else if (quality == Quality.PREMIUM) {
            necessarySlots = 2;
        } else {
            throw new ApiException("Undefined Quiality");
        }

        boolean availableSlots = inventoryRepository.hasEnoughSlots(userId,necessarySlots);

        if(!availableSlots) {
            throw new ApiException("Insufficient Slots");
        }
    }
}
