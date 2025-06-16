package lautadev.pokeme.app.Services.boosterPack.Impl;

import lautadev.pokeme.app.DTO.request.boosterPack.CreateTypeBoosterPackRequest;
import lautadev.pokeme.app.DTO.response.boosterPack.TypeBoosterPackResponse;
import lautadev.pokeme.app.Entities.TypeBoosterPack;
import lautadev.pokeme.app.Entities.enums.Quality;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Repositories.TypeBoosterPackRepository;
import lautadev.pokeme.app.Services.boosterPack.TypeBoosterPackService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TypeBoosterPackServiceImpl implements TypeBoosterPackService {

    private final TypeBoosterPackRepository typeBoosterPackRepository;

    @Override
    public void createTypeBoosterPack(CreateTypeBoosterPackRequest createTypeBoosterPackRequest) {
        TypeBoosterPack typeBoosterPack = createTypeBoosterPackFromDTO(createTypeBoosterPackRequest);
        typeBoosterPackRepository.save(typeBoosterPack);
    }


    // TODO: Add cache
    @Override
    public List<TypeBoosterPackResponse> getBoosterPacks() {
        List<TypeBoosterPack> typeBoosterPacks = typeBoosterPackRepository.findByIsDeletedFalse();

        return this.buildTypeBoosterPackResponse(typeBoosterPacks);
    }

    private TypeBoosterPack createTypeBoosterPackFromDTO(CreateTypeBoosterPackRequest createTypeBoosterPackRequest) {

        int amountPokemon;
        BigDecimal price;

        if (createTypeBoosterPackRequest.quality() == Quality.BASIC) {
            amountPokemon = 5;
            price = BigDecimal.valueOf(500);
        } else if (createTypeBoosterPackRequest.quality() == Quality.PREMIUM) {
            amountPokemon = 6;
            price = BigDecimal.valueOf(800);
        } else {
            throw new ApiException("Invalid type quality");
        }

        return TypeBoosterPack.builder()
                .quality(createTypeBoosterPackRequest.quality())
                .amountPokemon(amountPokemon)
                .price(price)
                .isDeleted(false)
                .build();
    }

    private List<TypeBoosterPackResponse> buildTypeBoosterPackResponse(List<TypeBoosterPack> typeBoosterPacks){
        return typeBoosterPacks.stream()
                .map(tp -> new TypeBoosterPackResponse(
                        tp.getId(),
                        tp.getQuality(),
                        tp.getAmountPokemon(),
                        tp.getPrice(),
                        tp.isDeleted()
                ))
                .toList();
    }

}
