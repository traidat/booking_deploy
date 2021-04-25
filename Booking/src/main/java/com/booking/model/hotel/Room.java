package com.booking.model.hotel;

import com.booking.model.Image;
import com.booking.model.Services;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "room")
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int roomId;

    @Column(name = "agent_id")
    private int agentId;

    @Column(name = "price")
    private double price;

    @Column(name = "number_room")
    private int numberRoom;

    @Column(name = "adult")
    private int adult;

    @Column(name = "children")
    private int children;

    @Column(name = "room_name")
    private String roomName;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "room_service", joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private List<Services> services;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "room_image", joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private Set<Image> images;

    public Room(int agentId, double price, int adult, int children, String roomName, int numberRoom) {
        this.agentId = agentId;
        this.price = price;
        this.adult = adult;
        this.children = children;
        this.roomName = roomName;
        this.numberRoom = numberRoom;
    }

    public Room(int agentId, double price, int numberRoom, int adult, int children, String roomName, List<Services> services) {
        this.agentId = agentId;
        this.price = price;
        this.numberRoom = numberRoom;
        this.children = children;
        this.adult = adult;
        this.roomName = roomName;
        this.services = services;
    }
}
