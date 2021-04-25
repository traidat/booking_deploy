package com.booking.model.hotel;

import com.booking.model.OrderStatus;
import com.booking.model.payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.time.LocalDate;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomOrderInfo {
    private int orderId;

    private int roomId;

    private int agentId;

    private int touristId;

    private String touristName;

    private String touristPhone;

    private int numberRoom;

    private String hotelName;

    private LocalDate fromDate;

    private LocalDate toDate;

    private LocalDate orderDate;

    private String roomName;

    private OrderStatus orderStatus;

    private double totalPrice;

    private PaymentStatus paymentStatus;

    private String accountNumber;

    private int isPaid;
}
