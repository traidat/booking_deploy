package com.booking.model.agent;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Locale;
import java.util.Set;

@Data
public class AgentSignUp {
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

    @NotNull
    private String agentType;

    private List<Integer> services;

    private Set<String> images;

    @NotNull
    private double lng;

    @NotNull
    private double lat;

    public boolean isValidAgentType() {
        this.agentType = agentType.toUpperCase();
        if (agentType.equals("TOURIST_AREA") || agentType.equals("HOTEL") || agentType.equals("AIRLINE") || agentType.equals("RESTAURANT")) {
            return true;
        } else {
            return false;
        }
    }


}
