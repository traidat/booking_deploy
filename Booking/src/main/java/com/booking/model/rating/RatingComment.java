package com.booking.model.rating;

import lombok.Data;

import javax.persistence.Column;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RatingComment {
    @NotNull
    @Size(min = 1)
    private String comment;

    @Min(value = 0)
    @Max(value = 10)
    private int rating;
}
