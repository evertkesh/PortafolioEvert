package com.example.Evert.controller;

import com.example.Evert.dto.ApiResponse;
import com.example.Evert.dto.ContactRequest;
import com.example.Evert.service.EmailService;
import com.example.Evert.util.RateLimiterService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Slf4j
public class ContactController {

    private final EmailService emailService;
    private final RateLimiterService rateLimiterService;

    @PostMapping
    public ResponseEntity<ApiResponse> sendContact(@Valid @RequestBody ContactRequest request, HttpServletRequest httpRequest) {
        String clientIp = getClientIp(httpRequest);
        Bucket bucket = rateLimiterService.resolveBucket(clientIp);

        if (!bucket.tryConsume(1)) {
            log.warn("Rate limit excedido para IP: {}", clientIp);
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(ApiResponse.builder()
                            .success(false)
                            .message("Demasiadas solicitudes. Por favor, inténtalo más tarde.")
                            .build());
        }

        try {
            emailService.sendContactEmail(request);
            return ResponseEntity.ok(ApiResponse.builder()
                    .success(true)
                    .message("Mensaje recibido y guardado correctamente.")
                    .build());
        } catch (Exception e) {
            log.error("Error al procesar contacto: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.builder()
                            .success(false)
                            .message("Error interno al procesar su mensaje.")
                            .build());
        }
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
