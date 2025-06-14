package lautadev.pokeme.app.Controller.customer;

import lautadev.pokeme.app.DTO.response.customer.UserDetails;
import lautadev.pokeme.app.Services.customer.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDetails> myInformation(){
        return ResponseEntity.ok(userService.getUserLogged());
    }
}
