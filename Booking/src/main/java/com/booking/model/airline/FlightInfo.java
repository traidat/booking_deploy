package com.booking.model.airline;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FlightInfo {
    
    @NotNull
    private int businessSeat;

    @NotNull
    private double businessPrice;

    @NotNull
    private int economySeat;

    @NotNull
    private double economyPrice;

    @NotNull
    private int premiumSeat;

    @NotNull
    private double premiumPrice;

    @NotNull
    private int firstClassSeat;

    @NotNull
    private double firstClassPrice;

    @NotNull
    private int fromAirport;

    @NotNull
    private int toAirport;

    @NotNull
    private String startTime;

    @NotNull
    private String endTime;

}
