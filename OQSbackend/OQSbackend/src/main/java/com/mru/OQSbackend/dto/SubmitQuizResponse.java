package com.mru.OQSbackend.dto;

public class SubmitQuizResponse {

    private Long attemptId;
    private Integer score;
    private Integer totalPoints;
    private Double percentage;
    private String message;

    public SubmitQuizResponse(Long attemptId, Integer score, Integer totalPoints, Double percentage, String message) {
        this.attemptId = attemptId;
        this.score = score;
        this.totalPoints = totalPoints;
        this.percentage = percentage;
        this.message = message;
    }

    public Long getAttemptId() {
        return attemptId;
    }

    public Integer getScore() {
        return score;
    }

    public Integer getTotalPoints() {
        return totalPoints;
    }

    public Double getPercentage() {
        return percentage;
    }

    public String getMessage() {
        return message;
    }
}
