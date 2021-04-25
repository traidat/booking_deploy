package com.booking.model.payment;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "payment")
@NoArgsConstructor
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private int paymentId;

    @Column(name = "tourist_id")
    private int touristId;

    @Column(name = "order_id")
    private int orderId;

    @Column(name = "agent_id")
    private int agentId;

    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @Column(name = "account_number")
    private String accountNumber;

    @Column(name = "transfer")
    private double transfer;

    public Payment(int touristId, int orderId, int agentId, PaymentStatus paymentStatus, double transfer) {
        this.touristId = touristId;
        this.orderId = orderId;
        this.agentId = agentId;
        this.paymentStatus = paymentStatus;
        this.transfer = transfer;
    }
}
