package com.booking.repository;

import com.booking.model.airline.Flight;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface FlightRepository extends CrudRepository<Flight, Integer> {
    Optional<List<Flight>> findByFromAirportAndToAirportAndStartTimeGreaterThanEqual(int fromAirport, int toAirport, Date startTime);
    Optional<Flight> findByFlightId(int flightId);
}
