package lautadev.pokeme.app.DTO.response.user;

import lautadev.pokeme.app.DTO.response.boosterPack.ShowCardPokemonResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InventoryDTO {

    private Long id;
    private int slotUsed;
    private List<ShowCardPokemonResponse> pokemon;

}
