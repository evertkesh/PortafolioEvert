package com.example.Evert.service;

import com.example.Evert.dto.ContactRequest;
import com.example.Evert.model.ContactMessage;
import com.example.Evert.repository.ContactRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;
    private final ContactRepository contactRepository;

    @Value("${app.contact.to-email}")
    private String toEmail;

    public void sendContactEmail(ContactRequest request) {
        // 1. Siempre guardar en base de datos primero
        ContactMessage contactMessage = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .subject(request.getSubject())
                .message(request.getMessage())
                .build();
        
        contactRepository.save(contactMessage);
        log.info("Mensaje guardado en base de datos local (H2) con ID: {}", contactMessage.getId());

        // 2. Intentar enviar el email, pero no romper si falla
        try {
            if (toEmail == null || toEmail.contains("tu-correo") || toEmail.isEmpty()) {
                log.warn("Configuración de email no detectada o incompleta. Saltando envío de correo.");
                return;
            }

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Nuevo contacto desde portafolio: " + request.getSubject());
            
            String finalHtml = "<h3>Tienes un nuevo mensaje de contacto</h3>" +
                "<p><strong>Nombre:</strong> " + request.getName() + "</p>" +
                "<p><strong>Email:</strong> " + request.getEmail() + "</p>" +
                "<p><strong>Asunto:</strong> " + request.getSubject() + "</p>" +
                "<p><strong>Mensaje:</strong><br/>" + request.getMessage().replace("\n", "<br/>") + "</p>";

            helper.setText(finalHtml, true);
            helper.setReplyTo(request.getEmail());

            log.info("Intentando enviar correo de {} a {}", request.getEmail(), toEmail);
            mailSender.send(message);
            log.info("Email enviado exitosamente.");
        } catch (Exception e) {
            log.error("El mensaje se guardó en DB, pero falló el envío del email: {}", e.getMessage());
            // No relanzamos la excepción para que el controlador devuelva 200 OK
        }
    }
}
