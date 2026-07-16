package com.mru.OQSbackend.dto;

import java.util.List;

public class QuizDetailResponse extends QuizSummaryResponse {

    private List<QuestionResponse> questions;

    public QuizDetailResponse(Long id, String title, String subject, String description, Integer durationMinutes,
            Integer questionCount, String createdBy, List<QuestionResponse> questions) {
        super(id, title, subject, description, durationMinutes, questionCount, createdBy);
        this.questions = questions;
    }

    public List<QuestionResponse> getQuestions() {
        return questions;
    }
}
