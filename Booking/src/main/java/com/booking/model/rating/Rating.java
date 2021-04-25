package com.booking.model.rating;

import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "rating")
@Data
@NoArgsConstructor
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rating_id")
    private int ratingId;

    @Column(name = "order_id")
    private int orderId;

    @Column(name = "tourist_id")
    private int touristId;

    @Column(name = "hotel_id")
    private int hotelId;

    @Column(name = "comment")
    private String comment;

    @Column(name = "rating")
    private int rating;

    public Rating(int orderId, int touristId, int hotelId, String comment, int rating) {
        this.orderId = orderId;
        this.touristId = touristId;
        this.hotelId = hotelId;
        this.comment = comment;
        this.rating = rating;
    }
}
