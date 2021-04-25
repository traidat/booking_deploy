package com.booking.model.address;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "city_id")
    private int cityId;

    @Column(name = "country_id")
    private int countryId;

    @Column(name = "city_name")
    private String cityName;
}
