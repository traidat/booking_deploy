package com.booking.model.agent;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.*;

@Data
public class AgentModify {
    @NotNull
    @Size(min = 3, max = 45)
    private String name;

    @NotNull
    @Size(min = 3, max = 45)
    private String phone;

    @NotNull
    @Size(min = 3, max = 45)
    private String address;

    @NotNull
    @Size(min = 3, max = 45)
    private String city;

    @NotNull
    @Size(min = 3, max = 45)
    private String country;

    @NotNull
    @Size(min = 3)
    private String description;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")
    @Size(min = 3, max = 45)
    private String email;

    private List<Integer> services;
}
