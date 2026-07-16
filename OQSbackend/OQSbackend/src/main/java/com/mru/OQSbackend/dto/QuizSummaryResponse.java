package com.mru.OQSbackend.dto;

public class QuizSummaryResponse {

    private Long id;
    private String title;
    private String subject;
    private String description;
    private Integer durationMinutes;
    private Integer questionCount;
    private String createdBy;

    public QuizSummaryResponse(Long id, String title, String subject, String description, Integer durationMinutes,
            Integer questionCount, String createdBy) {
        this.id = id;
        this.title = title;
        this.subject = subject;
        this.description = description;
        this.durationMinutes = durationMinutes;
        this.questionCount = questionCount;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getSubject() {
        return subject;
    }

    public String getDescription() {
        return description;
    }

    public Integer getDurationMinutes() {
        return durationMinutes;
    }

    public Integer getQuestionCount() {
        return questionCount;
    }

    public String getCreatedBy() {
        return createdBy;
    }
}
