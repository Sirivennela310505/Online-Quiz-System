package com.mru.OQSbackend.dto;

public class AdminStatsResponse {

    private long totalUsers;
    private long students;
    private long teachers;
    private long admins;
    private long quizzes;
    private long attempts;

    public AdminStatsResponse(long totalUsers, long students, long teachers, long admins, long quizzes, long attempts) {
        this.totalUsers = totalUsers;
        this.students = students;
        this.teachers = teachers;
        this.admins = admins;
        this.quizzes = quizzes;
        this.attempts = attempts;
    }

    public long getTotalUsers() {
        return totalUsers;
    }

    public long getStudents() {
        return students;
    }

    public long getTeachers() {
        return teachers;
    }

    public long getAdmins() {
        return admins;
    }

    public long getQuizzes() {
        return quizzes;
    }

    public long getAttempts() {
        return attempts;
    }
}
