package com.booking.model.airline;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "flight")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flight_id")
    private int flightId;

    @Column(name = "agent_id")
    private int agentId;

    @Column(name = "business_seat")
    private int businessSeat;

    @Column(name = "business_price")
    private double businessPrice;

    @Column(name = "economy_seat")
    private int economySeat;

    @Column(name = "economy_price")
    private double economyPrice;

    @Column(name = "premium_seat")
    private int premiumSeat;

    @Column(name = "premium_price")
    private double premiumPrice;

    @Column(name = "first_class_seat")
    private int firstClassSeat;

    @Column(name = "first_class_price")
    private double firstClassPrice;

    @Column(name = "from_airport")
    private int fromAirport;

    @Column(name = "to_airport")
    private int toAirport;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    public Flight(int agentId, int businessSeat, double businessPrice, int economySeat, double economyPrice,
                  int premiumSeat, double premiumPrice, int firstClassSeat, double firstClassPrice, int fromAirport,
                  int toAirport, Date startTime, Date endTime) {
        this.agentId = agentId;
        this.businessSeat = businessSeat;
        this.businessPrice = businessPrice;
        this.economySeat = economySeat;
        this.economyPrice = economyPrice;
        this.premiumSeat = premiumSeat;
        this.premiumPrice = premiumPrice;
        this.firstClassSeat = firstClassSeat;
        this.firstClassPrice = firstClassPrice;
        this.fromAirport = fromAirport;
        this.toAirport = toAirport;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
