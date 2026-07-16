package com.mru.OQSbackend.dto;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

public class SubmitQuizRequest {

    @Valid
    @NotEmpty(message = "Submit at least one answer")
    private List<AnswerRequest> answers;

    public List<AnswerRequest> getAnswers() {
        return answers;
    }

    public void setAnswers(List<AnswerRequest> answers) {
        this.answers = answers;
    }
}
