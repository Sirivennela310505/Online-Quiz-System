package com.mru.OQSbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.mru.OQSbackend.dto.AuthResponse;
import com.mru.OQSbackend.dto.LoginRequest;
import com.mru.OQSbackend.dto.RegisterRequest;
import com.mru.OQSbackend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public AuthResponse registerUser(@Valid @RequestBody RegisterRequest request) {

        return userService.register(request);

    }

    @PostMapping("/login")
    public AuthResponse loginUser(@Valid @RequestBody LoginRequest request) {

        return userService.login(request);

    }

}
