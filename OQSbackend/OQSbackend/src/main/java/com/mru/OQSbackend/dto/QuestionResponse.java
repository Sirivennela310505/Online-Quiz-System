package com.mru.OQSbackend.dto;

import java.util.List;

public class QuestionResponse {

    private Long id;
    private String text;
    private Integer points;
    private List<OptionResponse> options;

    public QuestionResponse(Long id, String text, Integer points, List<OptionResponse> options) {
        this.id = id;
        this.text = text;
        this.points = points;
        this.options = options;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Integer getPoints() {
        return points;
    }

    public List<OptionResponse> getOptions() {
        return options;
    }
}
