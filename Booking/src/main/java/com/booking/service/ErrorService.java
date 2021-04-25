package com.booking.service;

import com.booking.model.ErrorCustom;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;

import java.util.ArrayList;
import java.util.List;

@Service
public class ErrorService {

    public static List<ErrorCustom> getError(List<FieldError> fieldErrors) {
        List<ErrorCustom> errors = new ArrayList<ErrorCustom>();
        for (FieldError f : fieldErrors) {
            ErrorCustom errorCustom = new ErrorCustom();
            errorCustom.setObjectName(f.getObjectName());
            errorCustom.setMessage(f.getField() + " " + f.getDefaultMessage());
            errors.add(errorCustom);
        }
        return errors;
    }

}
