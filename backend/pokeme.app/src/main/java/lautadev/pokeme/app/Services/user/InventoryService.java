package lautadev.pokeme.app.Services.user;

import lautadev.pokeme.app.DTO.response.user.InventoryDTO;
import org.springframework.data.domain.Pageable;

public interface InventoryService {
    InventoryDTO myInventory(Pageable pageable);
}
