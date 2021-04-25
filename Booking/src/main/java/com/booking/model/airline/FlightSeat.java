package com.booking.model.airline;

import com.booking.model.payment.PaymentStatus;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class FlightSeat {
    @NotNull
    private PaymentStatus paymentStatus;

    private String accountNumber;

    private int businessSeat;

    private int economySeat;

    private int premiumSeat;

    private int firstClassSeat;
}
