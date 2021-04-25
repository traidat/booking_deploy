package com.booking.model.rating;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Table(name = "reply")
@NoArgsConstructor
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private int replyId;

    @Column(name = "rating_id")
    private int ratingId;

    @Column(name = "hotel_name")
    private String hotelName;

    @Column(name = "hotel_id")
    private int hotelId;

    @Column(name = "reply")
    private String reply;
}
