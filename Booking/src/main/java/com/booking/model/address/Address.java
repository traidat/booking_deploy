package com.booking.model.address;


import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
public class Address {
    @NotNull
    private String country;
    @NotNull
    private String city;
}
