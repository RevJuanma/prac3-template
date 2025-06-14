package lautadev.pokeme.app.Services.authentication.Impl;

import io.jsonwebtoken.Claims;
import lautadev.pokeme.app.DTO.request.authentication.LoginRequest;
import lautadev.pokeme.app.DTO.request.authentication.RefreshTokenRequest;
import lautadev.pokeme.app.DTO.request.authentication.UserRegisterRequest;
import lautadev.pokeme.app.DTO.response.authentication.Token;
import lautadev.pokeme.app.Entities.Deck;
import lautadev.pokeme.app.Entities.Favorite;
import lautadev.pokeme.app.Entities.Inventory;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Entities.enums.Role;
import lautadev.pokeme.app.Exceptions.BadCredentialsInLoginException;
import lautadev.pokeme.app.Exceptions.EmailAlreadyExistException;
import lautadev.pokeme.app.Exceptions.TokenExpiredException;
import lautadev.pokeme.app.Exceptions.UserNotFoundException;
import lautadev.pokeme.app.Repositories.UserRepository;
import lautadev.pokeme.app.Security.JwtBlacklistManager;
import lautadev.pokeme.app.Services.authentication.AuthenticationService;
import lautadev.pokeme.app.Services.authentication.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final JwtBlacklistManager jwtBlacklistManager;

    @Override
    @Transactional
    public Token registerUser(UserRegisterRequest userRegisterRequest) {
        validateEmail(userRegisterRequest.email());
        String encodedPassword = passwordEncoder.encode(userRegisterRequest.password());

        User user = createUserAndInitializerAccount(userRegisterRequest,encodedPassword);;

        String token = tokenService.generateToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);
        return new Token(token,refreshToken);
    }

    @Override
    public Token login(LoginRequest loginRequest) {
        try {
            User user = userRepository.findByEmail(loginRequest.identifier())
                    .orElseThrow(BadCredentialsInLoginException::new);

            if (!passwordEncoder.matches(loginRequest.password(), user.getPassword())) {
                throw new BadCredentialsInLoginException();
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), loginRequest.password()));

            String token = tokenService.generateToken(user);
            String refreshToken = tokenService.generateRefreshToken(user);
            return new Token(token,refreshToken);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsInLoginException();
        }
    }

    @Override
    public void logout(String token) {
        jwtBlacklistManager.addTokenToBlackList(token);
    }

    @Override
    public Token refreshAccessToken(RefreshTokenRequest refreshTokenRequest) {
        Claims claims = tokenService.extractAllClaims(refreshTokenRequest.token());

        String username = claims.getSubject();
        User user = userRepository.findByEmail(username)
                .orElseThrow(UserNotFoundException::new);

        if (tokenService.isTokenExpired(refreshTokenRequest.token())) {
            throw new TokenExpiredException();
        }

        String newAccessToken = tokenService.generateToken(user);
        String newRefreshToken = tokenService.generateRefreshToken(user);

        return new Token(newAccessToken, newRefreshToken);
    }

    private void validateEmail(String email) {
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new EmailAlreadyExistException();
        }
    }

    private User createUserAndInitializerAccount(UserRegisterRequest userRegisterRequest, String encodedPassword) {

        Inventory inventory = new Inventory();
        inventory.setSlotUsed(0);

        Deck deck = new Deck();
        deck.setSlotUsed(0);

        Favorite favorite = new Favorite();
        favorite.setSlotUsed(0);

        User user = User.builder()
                .name(userRegisterRequest.name())
                .password(encodedPassword)
                .email(userRegisterRequest.email())
                .balance(BigDecimal.valueOf(100))
                .roles(Collections.singleton(Role.USER))
                .inventory(inventory)
                .deck(deck)
                .favorite(favorite)
                .isDeleted(false)
                .build();

        inventory.setUser(user);
        deck.setUser(user);
        favorite.setUser(user);

        user = userRepository.save(user);
        return user;
    }
}
