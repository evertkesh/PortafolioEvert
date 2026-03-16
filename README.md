# Backend Portafolio Personal

Backend desarrollado en Spring Boot 3 para gestionar el formulario de contacto del portafolio personal.

## Características

- **Java 17 / 21**
- **Spring Boot 3.2.x**
- **Spring Boot Starter Mail**: Envío de correos mediante SMTP (Gmail).
- **Spring Data JPA + H2**: Almacenamiento de mensajes (Persistencia en archivo).
- **Rate Limiting**: Protección básica contra spam (Bucket4j).
- **Validación**: Validación estricta de campos de entrada.
- **Swagger UI**: Documentación de la API en `/swagger-ui.html`.

## Configuración

### Variables de Entorno

Crear un archivo `.env` o configurar las variables de entorno en su sistema/despliegue:

```properties
# Correo que envía (SMTP)
SPRING_MAIL_USERNAME=tu_correo@gmail.com
SPRING_MAIL_PASSWORD=tu_app_password
SPRING_MAIL_HOST=smtp.gmail.com
SPRING_MAIL_PORT=587

# Destinatario del contacto
APP_CONTACT_TO_EMAIL=keshratamaldonado@gmail.com

# CORS (Dominios permitidos en producción)
APP_ALLOWED_ORIGINS=https://mi-portafolio.com
```

### Ejecutar Localmente

```bash
# Limpiar e instalar dependencias
mvn clean install

# Ejecutar aplicación (perfil Dev por defecto)
mvn spring-boot:run
```

La API estará disponible en `http://localhost:8080`.
Swagger UI: `http://localhost:8080/swagger-ui.html`.

### Endpoints

**POST** `/api/contact`

Payload:
```json
{
  "name": "Juan Perez",
  "email": "juan@example.com",
  "subject": "Contacto",
  "message": "Hola, me interesa tu perfil."
}
```

### Despliegue en Azure (App Service Linux)

La aplicación está configurada para usar una base de datos H2 en un volumen persistente de Azure (`/home/data/portfolio_db`).

Asegúrese de configurar las variables de entorno en la sección "Configuration" > "Application Settings" del App Service.

<!-- Deployment trigger: 03/16/2026 15:11:54 -->
