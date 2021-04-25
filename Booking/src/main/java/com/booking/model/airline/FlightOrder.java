package com.booking.model.airline;

import com.booking.model.OrderStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "flight_order")
public class FlightOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;

    @Column(name = "tourist_id")
    private int touristId;

    @Column(name = "flight_id")
    private int flightId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @Column(name = "business_seat")
    private int businessSeat;

    @Column(name = "economy_seat")
    private int economySeat;

    @Column(name = "premium_seat")
    private int premiumSeat;

    @Column(name = "first_class_seat")
    private int firstClassSeat;


    public FlightOrder(int touristId, int flightId, Date orderDate, OrderStatus orderStatus, int businessSeat,
                       int economySeat, int premiumSeat, int firstClassSeat) {
        this.touristId = touristId;
        this.flightId = flightId;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.businessSeat = businessSeat;
        this.economySeat = economySeat;
        this.premiumSeat = premiumSeat;
        this.firstClassSeat = firstClassSeat;
    }
}
