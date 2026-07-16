package com.mru.OQSbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mru.OQSbackend.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByPublishedTrueOrderByCreatedAtDesc();
}
