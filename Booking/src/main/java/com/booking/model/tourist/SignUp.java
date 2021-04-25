package com.booking.model.tourist;

import lombok.Data;
import javax.validation.constraints.*;
import java.util.*;

@Data
public class SignUp {
    @NotNull
    @Size(min = 3, max = 45)
    private String name;

    @NotNull
    @Size(min = 3, max = 45)
    private String phone;

    @NotNull
    private int age;

    private List<String> url;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @Size(min = 3, max = 45)
    private String email;

}
