package com.booking.model.agent;

import com.booking.model.Image;
import com.booking.model.Services;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "agent")
@Data
@NoArgsConstructor
@JsonIgnoreProperties("accountId")
@AllArgsConstructor
public class Agent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "agent_id")
    private int agentId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "city")
    private String city;

    @Column(name = "country")
    private String country;

    @Column(name = "address")
    private String address;

    @Column(name = "description")
    private String description;

    @Column(name = "agent_type")
    private AgentType agentType;

    @Column(name = "lat")
    private double lat;

    @Column(name = "lng")
    private double lng;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "agent_service", joinColumns = @JoinColumn(name = "agent_id"),
            inverseJoinColumns = @JoinColumn(name = "service_id"))
    private List<Services> services;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "agent_image", joinColumns = @JoinColumn(name = "agent_id"),
            inverseJoinColumns = @JoinColumn(name = "image_id"))
    private Set<Image> images;

    public Agent(int accountId, String name, String email, String phone, String city, String country, String address,
                 String description, AgentType agentType) {
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.country = country;
        this.address = address;
        this.description = description;
        this.agentType = agentType;
    }

    public <E> Agent(int i, int i1, String song_chanh_hotel, String s, String s1, String quang_ninh, String viet_nam, String s2, String best_hotel_in_quang_yen, AgentType hotel, ArrayList<E> es) {
    }
}
