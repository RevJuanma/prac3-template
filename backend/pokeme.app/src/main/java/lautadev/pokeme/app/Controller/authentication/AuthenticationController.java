package lautadev.pokeme.app.Controller.authentication;

import jakarta.validation.Valid;
import lautadev.pokeme.app.DTO.request.authentication.LoginRequest;
import lautadev.pokeme.app.DTO.request.authentication.RefreshTokenRequest;
import lautadev.pokeme.app.DTO.request.authentication.UserRegisterRequest;
import lautadev.pokeme.app.DTO.response.GenericResponse;
import lautadev.pokeme.app.DTO.response.authentication.Token;
import lautadev.pokeme.app.Services.authentication.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<Token> registerUser(@RequestBody @Valid UserRegisterRequest userRegisterRequest) {
        return ResponseEntity.ok(authenticationService.registerUser(userRegisterRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<Token> login(@RequestBody @Valid LoginRequest loginRequest)  {
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }

    @PostMapping("/logout")
    public ResponseEntity<GenericResponse> logout(@RequestHeader(HttpHeaders.AUTHORIZATION)
                                                      String authorization) {
        authenticationService.logout(authorization);
        return ResponseEntity.ok(new GenericResponse("Logout successfully"));
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<Token> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshAccessToken(refreshTokenRequest));
    }
}
