package com.example.posts.post_params.controllers;

import com.example.posts.post_params.domain.user.AuthDTO;
import com.example.posts.post_params.domain.user.LoginResponseDTO;
import com.example.posts.post_params.domain.user.RegisterDTO;
import com.example.posts.post_params.domain.user.User;
import com.example.posts.post_params.infra.security.TokenService;
import com.example.posts.post_params.respositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid AuthDTO data){

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.login(), data.password());

        var auth =  this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.gerenateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token, ((User) auth.getPrincipal()).getName(), ((User) auth.getPrincipal()).getAge()));
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid RegisterDTO data){

        if(this.userRepository.findByLogin(data.login()) != null ) return ResponseEntity.badRequest().build();

        String ecryptedPassword =  new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User();

        BeanUtils.copyProperties(data, newUser);

        newUser.setPassword(ecryptedPassword);

        this.userRepository.save(newUser);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return ResponseEntity.ok("Logout realizado com sucesso!");
    }


}
