package com.booking.model.rating;

import com.booking.model.Image;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    private int ratingId;

    private int orderId;

    private int touristId;

    private String name;

    private String image;

    private String roomName;

    private LocalDate fromDate;

    private LocalDate toDate;

    private String comment;

    private int rating;

    private List<Reply> reply;
}
