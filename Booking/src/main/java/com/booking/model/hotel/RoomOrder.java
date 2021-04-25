package com.booking.model.hotel;

import com.booking.model.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "room_order")
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"orderId", "roomId", "touristId"})
public class RoomOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private int orderId;

    @Column(name = "room_id")
    private int roomId;

    @Column(name = "tourist_id")
    private int touristId;

    @Column(name = "order_date")
    private Date orderDate;

    @Column(name = "order_status")
    private OrderStatus orderStatus;

    @Column(name = "number_room")
    private int numberRoom;

    @Column(name = "from_date")
    private Date fromDate;

    @Column(name = "to_date")
    private Date toDate;

    @Column(name = "is_paid")
    private int isPaid;

    public RoomOrder(int roomId, int touristId, Date orderDate, OrderStatus orderStatus, int numberRoom, Date fromDate, Date toDate) {
        this.roomId = roomId;
        this.touristId = touristId;
        this.orderDate = orderDate;
        this.orderStatus = orderStatus;
        this.numberRoom = numberRoom;
        this.fromDate = fromDate;
        this.toDate = toDate;
    }
}
