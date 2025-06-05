package lautadev.pokeme.app.Services.authentication;

import lautadev.pokeme.app.DTO.request.authentication.LoginRequest;
import lautadev.pokeme.app.DTO.request.authentication.RefreshTokenRequest;
import lautadev.pokeme.app.DTO.request.authentication.UserRegisterRequest;
import lautadev.pokeme.app.DTO.response.authentication.Token;

public interface AuthenticationService {
    Token registerUser(UserRegisterRequest userRegisterRequest);
    Token login(LoginRequest loginRequest);
    void logout(String token);
    Token refreshAccessToken(RefreshTokenRequest refreshTokenRequest);
}
