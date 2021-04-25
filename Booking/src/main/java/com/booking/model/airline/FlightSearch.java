package com.booking.model.airline;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class FlightSearch {
    @NotNull
    @Size(min = 3, max = 45)
    private String fromCity;

    @NotNull
    @Size(min = 3, max = 45)
    private String fromCountry;

    @NotNull
    @Size(min = 3, max = 45)
    private String toCity;

    @NotNull
    @Size(min = 3, max = 45)
    private String toCountry;

    @NotNull
    @Size(min = 3, max = 45)
    private String startTime;
}
