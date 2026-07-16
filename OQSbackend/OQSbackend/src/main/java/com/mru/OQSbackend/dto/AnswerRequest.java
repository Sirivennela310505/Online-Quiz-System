package com.mru.OQSbackend.dto;

import jakarta.validation.constraints.NotNull;

public class AnswerRequest {

    @NotNull(message = "Question id is required")
    private Long questionId;

    @NotNull(message = "Option id is required")
    private Long optionId;

    public Long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Long questionId) {
        this.questionId = questionId;
    }

    public Long getOptionId() {
        return optionId;
    }

    public void setOptionId(Long optionId) {
        this.optionId = optionId;
    }
}
