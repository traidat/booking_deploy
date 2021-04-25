package com.booking;

import com.booking.model.Message;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public ResponseEntity methodNotAllowed() {
        Message message = new Message("Method not allowed");
        return new ResponseEntity (message, HttpStatus.METHOD_NOT_ALLOWED);
    }

//	@ExceptionHandler(value = NoHandlerFoundException.class)
//	public ResponseEntity<Object> fileNotFound(Exception ex, WebRequest request) {
//		Message message = new Message("Not found");
//		return new ResponseEntity<Object> (message, HttpStatus.NOT_FOUND);
//	}

}
