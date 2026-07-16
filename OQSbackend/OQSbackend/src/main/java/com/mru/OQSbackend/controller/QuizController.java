package com.mru.OQSbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mru.OQSbackend.dto.QuizDetailResponse;
import com.mru.OQSbackend.dto.QuizRequest;
import com.mru.OQSbackend.dto.QuizSummaryResponse;
import com.mru.OQSbackend.dto.SubmitQuizRequest;
import com.mru.OQSbackend.dto.SubmitQuizResponse;
import com.mru.OQSbackend.entity.User;
import com.mru.OQSbackend.service.QuizService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public List<QuizSummaryResponse> listQuizzes() {
        return quizService.listQuizzes();
    }

    @PostMapping
    public QuizDetailResponse createQuiz(@Valid @RequestBody QuizRequest request, @AuthenticationPrincipal User currentUser) {
        return quizService.createQuiz(request, currentUser);
    }

    @GetMapping("/{quizId}")
    public QuizDetailResponse getQuiz(@PathVariable Long quizId) {
        return quizService.getQuiz(quizId);
    }

    @PostMapping("/{quizId}/submit")
    public SubmitQuizResponse submitQuiz(@PathVariable Long quizId, @Valid @RequestBody SubmitQuizRequest request,
            @AuthenticationPrincipal User currentUser) {
        return quizService.submitQuiz(quizId, request, currentUser);
    }
}
