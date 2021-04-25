package com.booking.model.rating;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ReplyInfo {

    @NotNull
    private int ratingId;

    @NotNull
    private String reply;

    @NotNull
    private int hotelId;

}
