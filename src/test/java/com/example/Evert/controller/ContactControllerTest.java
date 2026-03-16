package com.example.Evert.controller;

import com.example.Evert.dto.ContactRequest;
import com.example.Evert.service.EmailService;
import com.example.Evert.util.RateLimiterService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.bucket4j.Bucket;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EmailService emailService;

    @MockBean
    private RateLimiterService rateLimiterService;

    @MockBean
    private Bucket bucket;

    @BeforeEach
    void setUp() {
        when(rateLimiterService.resolveBucket(anyString())).thenReturn(bucket);
        when(bucket.tryConsume(1)).thenReturn(true);
    }

    @Test
    @DisplayName("Debe enviar contacto correctamente con datos validos")
    void sendContact_ValidData_ReturnsSuccess() throws Exception {
        ContactRequest request = ContactRequest.builder()
                .name("Test User")
                .email("test@example.com")
                .subject("Asunto de prueba")
                .message("Este es un mensaje de prueba con longitud suficiente.")
                .build();

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Mensaje recibido y guardado correctamente."));

        verify(emailService, times(1)).sendContactEmail(any(ContactRequest.class));
    }

    @Test
    @DisplayName("Debe fallar cuando el email es invalido")
    void sendContact_InvalidEmail_ReturnsBadRequest() throws Exception {
        ContactRequest request = ContactRequest.builder()
                .name("Test User")
                .email("not-an-email")
                .subject("Asunto")
                .message("Cuerpo del mensaje largo")
                .build();

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors[0].field").value("email"));
    }

    @Test
    @DisplayName("Debe retornar 429 cuando el rate limit es excedido")
    void sendContact_RateLimitExceeded_ReturnsTooManyRequests() throws Exception {
        when(bucket.tryConsume(1)).thenReturn(false);

        ContactRequest request = ContactRequest.builder()
                .name("Test User")
                .email("test@example.com")
                .subject("Asunto")
                .message("Cuerpo del mensaje largo")
                .build();

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message", containsString("Demasiadas solicitudes")));
    }
}
