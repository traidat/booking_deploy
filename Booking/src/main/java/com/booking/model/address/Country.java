package com.booking.model.address;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "country_id")
    private int countryId;

    @Column(name = "country_name")
    private String countryName;

}
