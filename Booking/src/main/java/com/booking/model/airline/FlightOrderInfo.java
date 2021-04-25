package com.booking.model.airline;

import com.booking.model.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class FlightOrderInfo {
    private int flightId;

    private Airport fromAirport;

    private Airport toAirport;

    private Date startTime;

    private Date endTime;

    private int businessSeat;

    private int economySeat;

    private int premiumSeat;

    private int firstClassSeat;

    private OrderStatus orderStatus;

    private Date orderDate;
}
