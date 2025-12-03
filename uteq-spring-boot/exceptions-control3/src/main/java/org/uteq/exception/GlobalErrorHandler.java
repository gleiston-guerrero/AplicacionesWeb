package org.uteq.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalErrorHandler extends ResponseEntityExceptionHandler {

    // Maneja la excepción personalizada ModelNotFoundException.
    @ExceptionHandler(Exception.class)
    public ResponseEntity<CustomErrorResponse> handleDefaultException(Exception ex, WebRequest request) {
        // Crea un objeto de respuesta de error personalizado, con fecha, mensaje y detalles.
        CustomErrorResponse cer = new CustomErrorResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        // Retorna la respuesta con el error y el código 404 Not Found.
        return new ResponseEntity<>(cer, HttpStatus.NOT_ACCEPTABLE);
    }

    // Maneja todas las demás excepciones no controladas explícitamente.
    @ExceptionHandler(ModelNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> handleModelNotFoundException(ModelNotFoundException ex, WebRequest request) {
        // Crea una respuesta de error personalizada para otros errores generales.
        CustomErrorResponse cer = new CustomErrorResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        // Retorna la respuesta con el error y el código 500 Internal Server Error.
        return new ResponseEntity<>(cer, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ArithmeticException.class, BindException.class}) //ArithmeticException.class
    public ResponseEntity<CustomErrorResponse> handleArithmeticException(ArithmeticException ex, WebRequest request) {
        CustomErrorResponse cer = new CustomErrorResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<>(cer, HttpStatus.CONFLICT);
    }

    /*@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<CustomErrorResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex, WebRequest request) {
        CustomErrorResponse cer = new CustomErrorResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<>(cer, HttpStatus.BAD_REQUEST);
    }*/

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        CustomErrorResponse cer = new CustomErrorResponse(LocalDateTime.now(), ex.getMessage(), request.getDescription(false));

        return new ResponseEntity<>(cer, HttpStatus.BAD_REQUEST);
    }
}
