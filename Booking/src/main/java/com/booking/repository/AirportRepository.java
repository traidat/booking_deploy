package com.booking.repository;

import com.booking.model.airline.Airport;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AirportRepository extends CrudRepository<Airport, Integer> {
    Optional<List<Airport>> findByCityAndCountry(String city, String country);
}
