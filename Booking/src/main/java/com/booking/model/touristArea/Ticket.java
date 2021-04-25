package com.booking.model.touristArea;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Table(name = "ticket")
@Data
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    private int ticketId;

    @Column(name = "agent_id")
    private int agentId;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private double price;

    @Column(name = "amount")
    private int amount;

    @Column(name = "date")
    private Date date;

    public Ticket(int agentId, String name, double price, int amount, Date date) {
        this.agentId = agentId;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.date = date;
    }
}
