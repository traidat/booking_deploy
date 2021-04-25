package com.booking.model.touristArea;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
public class TicketInformation {
    @NotNull
    @Size(min = 3, max = 45)
    private String name;

    @NotNull
    private double price;

    @NotNull
    private int amount;

    @NotNull
    private Date date;
}
