package com.booking.service;

import com.booking.model.address.City;
import com.booking.model.address.Country;
import com.booking.repository.CityRepository;
import com.booking.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    CountryRepository countryRepository;
    @Autowired
    CityRepository cityRepository;

    public List<Country> getAllCountry() {
       return (List<Country>) countryRepository.findAll();
    }

    public List<City> getAllCityInCountry(int id) {
        Optional<List<City>> cities = cityRepository.findByCountryId(id);
        if (cities.isPresent()) {
            return cities.get() ;
        } else {
            return new ArrayList<>();
        }
    }

    public Country getCountryByName(String country) {
        Optional<Country> optionalCountry = countryRepository.findByCountryName(country);
        if (optionalCountry.isPresent()) {
            return optionalCountry.get();
        } else {
            return null;
        }
    }
}
