package com.mru.OQSbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mru.OQSbackend.dto.AdminStatsResponse;
import com.mru.OQSbackend.dto.UserSummaryResponse;
import com.mru.OQSbackend.enums.Role;
import com.mru.OQSbackend.repository.QuizAttemptRepository;
import com.mru.OQSbackend.repository.QuizRepository;
import com.mru.OQSbackend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @GetMapping("/stats")
    public AdminStatsResponse stats() {
        return new AdminStatsResponse(
                userRepository.count(),
                userRepository.countByRole(Role.STUDENT),
                userRepository.countByRole(Role.TEACHER),
                userRepository.countByRole(Role.ADMIN),
                quizRepository.count(),
                quizAttemptRepository.count());
    }

    @GetMapping("/users")
    public List<UserSummaryResponse> users() {
        return userRepository.findAll().stream()
                .map(user -> new UserSummaryResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .toList();
    }
}
