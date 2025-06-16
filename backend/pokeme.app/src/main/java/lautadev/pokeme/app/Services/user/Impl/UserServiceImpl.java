package lautadev.pokeme.app.Services.user.Impl;

import lautadev.pokeme.app.DTO.response.user.UserDetails;
import lautadev.pokeme.app.Entities.User;
import lautadev.pokeme.app.Exceptions.ApiException;
import lautadev.pokeme.app.Repositories.UserRepository;
import lautadev.pokeme.app.Services.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lautadev.pokeme.app.Exceptions.UserNotFoundException;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserDetailsService, UserService {

    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(UserNotFoundException::new);
    }


    @Override
    public UserDetails findUserById(Long id) {
        User user = userRepository.findByIdAndIsNotDeleted(id).orElseThrow(UserNotFoundException::new);
        return this.buildUserDetails(user);
    }

    @Override
    public UserDetails getUserLogged() {
        User user = this.getUserLoggedSecurityContext();
        return this.buildUserDetails(user);
    }

    @Override
    @Transactional
    public void withdrawBalance(BigDecimal amount) {
        User user = getUserLoggedSecurityContext();
        subtractMoney(user,amount);
    }

    @Override
    @Transactional
    public void increaseBalance(BigDecimal amount) {
        User user = getUserLoggedSecurityContext();
        addMoney(user,amount);
    }

    private UserDetails buildUserDetails(User user) {
        return new UserDetails(
                user.getName(),
                user.getEmail(),
                user.getBalance()
        );
    }

    private User getUserLoggedSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

    private void subtractMoney(User user, BigDecimal amount) {
        BigDecimal newBalance = user.getBalance().subtract(amount);
        boolean isNegativeBalance = newBalance.compareTo(BigDecimal.ZERO) < 0;

        if (isNegativeBalance) {
            log.warn("Insufficient balance to perform the subtraction, balance {}, subtract intent {}",
                    user.getBalance(), amount);
            throw new ApiException("Insufficient balance");
        }

        user.setBalance(newBalance);
        userRepository.save(user);
    }

    private void addMoney(User user, BigDecimal amount) {
        BigDecimal newBalance = user.getBalance().add(amount);
        user.setBalance(newBalance);
        userRepository.save(user);
    }

}
