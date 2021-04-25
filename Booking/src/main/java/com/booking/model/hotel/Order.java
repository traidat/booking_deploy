package com.booking.model.hotel;

import com.booking.model.payment.PaymentStatus;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class Order {
    @NotNull
    @Min(value = 1)
    private int numberRoom;

    @NotNull
    @Min(value = 1)
    private int roomId;

    @NotNull
    @Size(min = 3, max = 45)
    private String fromDate;

    @NotNull
    @Size(min = 3, max = 45)
    private String toDate;

    @NotNull
    private int agentId;

    @NotNull
    private PaymentStatus paymentStatus;

    @Size(min = 10, max = 15)
    private String accountNumber;

    @NotNull
    private int adult;

    @NotNull
    private int children;


}
