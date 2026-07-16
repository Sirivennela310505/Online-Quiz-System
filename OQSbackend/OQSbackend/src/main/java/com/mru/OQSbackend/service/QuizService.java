package com.mru.OQSbackend.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mru.OQSbackend.dto.AnswerRequest;
import com.mru.OQSbackend.dto.OptionResponse;
import com.mru.OQSbackend.dto.QuestionResponse;
import com.mru.OQSbackend.dto.QuizDetailResponse;
import com.mru.OQSbackend.dto.QuizRequest;
import com.mru.OQSbackend.dto.QuizSummaryResponse;
import com.mru.OQSbackend.dto.SubmitQuizRequest;
import com.mru.OQSbackend.dto.SubmitQuizResponse;
import com.mru.OQSbackend.entity.Question;
import com.mru.OQSbackend.entity.QuestionOption;
import com.mru.OQSbackend.entity.Quiz;
import com.mru.OQSbackend.entity.QuizAttempt;
import com.mru.OQSbackend.entity.User;
import com.mru.OQSbackend.enums.Role;
import com.mru.OQSbackend.repository.QuizAttemptRepository;
import com.mru.OQSbackend.repository.QuizRepository;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Transactional
    public QuizDetailResponse createQuiz(QuizRequest request, User currentUser) {
        if (currentUser.getRole() == Role.STUDENT) {
            throw new AccessDeniedException("Only teachers and admins can create quizzes");
        }

        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setSubject(request.getSubject());
        quiz.setDescription(request.getDescription());
        quiz.setDurationMinutes(request.getDurationMinutes());
        quiz.setPublished(request.getPublished());
        quiz.setCreatedBy(currentUser);

        request.getQuestions().forEach(questionRequest -> {
            long correctCount = questionRequest.getOptions().stream().filter(option -> Boolean.TRUE.equals(option.getCorrect())).count();
            if (correctCount != 1) {
                throw new IllegalArgumentException("Each question must have exactly one correct option");
            }

            Question question = new Question();
            question.setText(questionRequest.getText());
            question.setPoints(questionRequest.getPoints() == null ? 1 : questionRequest.getPoints());

            questionRequest.getOptions().forEach(optionRequest -> {
                QuestionOption option = new QuestionOption();
                option.setText(optionRequest.getText());
                option.setCorrect(optionRequest.getCorrect());
                question.addOption(option);
            });

            quiz.addQuestion(question);
        });

        return toDetail(quizRepository.save(quiz));
    }

    @Transactional(readOnly = true)
    public List<QuizSummaryResponse> listQuizzes() {
        return quizRepository.findByPublishedTrueOrderByCreatedAtDesc().stream()
                .map(this::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public QuizDetailResponse getQuiz(Long quizId) {
        return toDetail(findQuiz(quizId));
    }

    @Transactional
    public SubmitQuizResponse submitQuiz(Long quizId, SubmitQuizRequest request, User currentUser) {
        Quiz quiz = findQuiz(quizId);
        Map<Long, AnswerRequest> answersByQuestion = request.getAnswers().stream()
                .collect(Collectors.toMap(AnswerRequest::getQuestionId, Function.identity(), (first, second) -> second));

        int score = 0;
        int totalPoints = 0;

        for (Question question : quiz.getQuestions()) {
            int points = question.getPoints() == null ? 1 : question.getPoints();
            totalPoints += points;

            AnswerRequest answer = answersByQuestion.get(question.getId());
            if (answer == null) {
                continue;
            }

            boolean correct = question.getOptions().stream()
                    .anyMatch(option -> option.getId().equals(answer.getOptionId()) && Boolean.TRUE.equals(option.getCorrect()));
            if (correct) {
                score += points;
            }
        }

        QuizAttempt attempt = new QuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setStudent(currentUser);
        attempt.setScore(score);
        attempt.setTotalPoints(totalPoints);
        attempt.setSubmittedAt(LocalDateTime.now());
        quizAttemptRepository.save(attempt);

        double percentage = totalPoints == 0 ? 0 : Math.round((score * 10000.0) / totalPoints) / 100.0;
        return new SubmitQuizResponse(attempt.getId(), score, totalPoints, percentage, "Quiz submitted successfully");
    }

    private Quiz findQuiz(Long quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new IllegalArgumentException("Quiz not found"));
    }

    private QuizSummaryResponse toSummary(Quiz quiz) {
        return new QuizSummaryResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getSubject(),
                quiz.getDescription(),
                quiz.getDurationMinutes(),
                quiz.getQuestions().size(),
                quiz.getCreatedBy() == null ? "System" : quiz.getCreatedBy().getFullName());
    }

    private QuizDetailResponse toDetail(Quiz quiz) {
        List<QuestionResponse> questions = quiz.getQuestions().stream()
                .map(question -> new QuestionResponse(
                        question.getId(),
                        question.getText(),
                        question.getPoints(),
                        question.getOptions().stream()
                                .map(option -> new OptionResponse(option.getId(), option.getText()))
                                .toList()))
                .toList();

        return new QuizDetailResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getSubject(),
                quiz.getDescription(),
                quiz.getDurationMinutes(),
                quiz.getQuestions().size(),
                quiz.getCreatedBy() == null ? "System" : quiz.getCreatedBy().getFullName(),
                questions);
    }
}
