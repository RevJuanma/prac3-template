package lautadev.pokeme.app.Services.boosterPack.Impl;

import lautadev.pokeme.app.DTO.request.boosterPack.BuyBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPack.MyBoosterPacksBuyedResponse;
import lautadev.pokeme.app.Entities.BoosterPackBuyed;
import lautadev.pokeme.app.Entities.TypeBoosterPack;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Repositories.BoosterPackBuyedRepository;
import lautadev.pokeme.app.Repositories.TypeBoosterPackRepository;
import lautadev.pokeme.app.Services.boosterPack.BoosterPackBuyedService;
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
    private final TypeBoosterPackRepository typeBoosterPackRepository;
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
        List<BoosterPackBuyed> boosterPackBuyeds = boosterPackBuyedRepository.findByUserIdAndCountNotZero(user.getId());
        return buildMyBoosterPacksBuyedResponse(boosterPackBuyeds);
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private List<MyBoosterPacksBuyedResponse> buildMyBoosterPacksBuyedResponse(List<BoosterPackBuyed> boosterPackBuyeds) {
        return boosterPackBuyeds.stream()
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
}
