package com.mru.OQSbackend.dto;

public class OptionResponse {

    private Long id;
    private String text;

    public OptionResponse(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}
