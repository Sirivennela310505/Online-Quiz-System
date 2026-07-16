package com.mru.OQSbackend.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.mru.OQSbackend.entity.User;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    public String generateToken(User user) {
        long issuedAt = Instant.now().toEpochMilli();
        long expiresAt = issuedAt + expirationMs;

        String header = base64Url("{\"alg\":\"HS256\",\"typ\":\"JWT\"}");
        String payload = base64Url("{\"sub\":\"" + escape(user.getEmail()) + "\",\"role\":\"" + user.getRole().name()
                + "\",\"name\":\"" + escape(user.getFullName()) + "\",\"iat\":" + issuedAt + ",\"exp\":" + expiresAt + "}");
        String signature = sign(header + "." + payload);

        return header + "." + payload + "." + signature;
    }

    public Optional<String> extractEmail(String token) {
        if (!isValid(token)) {
            return Optional.empty();
        }

        String payloadJson = new String(Base64.getUrlDecoder().decode(token.split("\\.")[1]), StandardCharsets.UTF_8);
        return extractString(payloadJson, "sub");
    }

    public boolean isValid(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3) {
                return false;
            }

            String expectedSignature = sign(parts[0] + "." + parts[1]);
            if (!constantTimeEquals(expectedSignature, parts[2])) {
                return false;
            }

            String payloadJson = new String(Base64.getUrlDecoder().decode(parts[1]), StandardCharsets.UTF_8);
            Optional<Long> expiresAt = extractLong(payloadJson, "exp");
            return expiresAt.isPresent() && expiresAt.get() > Instant.now().toEpochMilli();
        } catch (Exception ex) {
            return false;
        }
    }

    private String sign(String value) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(value.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception ex) {
            throw new IllegalStateException("Unable to sign token", ex);
        }
    }

    private String base64Url(String value) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }

    private Optional<String> extractString(String json, String key) {
        String marker = "\"" + key + "\":\"";
        int start = json.indexOf(marker);
        if (start < 0) {
            return Optional.empty();
        }
        int valueStart = start + marker.length();
        int valueEnd = json.indexOf("\"", valueStart);
        if (valueEnd < 0) {
            return Optional.empty();
        }
        return Optional.of(json.substring(valueStart, valueEnd).replace("\\\"", "\"").replace("\\\\", "\\"));
    }

    private Optional<Long> extractLong(String json, String key) {
        String marker = "\"" + key + "\":";
        int start = json.indexOf(marker);
        if (start < 0) {
            return Optional.empty();
        }
        int valueStart = start + marker.length();
        int valueEnd = valueStart;
        while (valueEnd < json.length() && Character.isDigit(json.charAt(valueEnd))) {
            valueEnd++;
        }
        return Optional.of(Long.parseLong(json.substring(valueStart, valueEnd)));
    }

    private String escape(String value) {
        return value.replace("\\", "\\\\").replace("\"", "\\\"");
    }

    private boolean constantTimeEquals(String first, String second) {
        return MessageDigest.isEqual(first.getBytes(StandardCharsets.UTF_8), second.getBytes(StandardCharsets.UTF_8));
    }
}
