package com.booking.repository;

import com.booking.model.OrderStatus;
import com.booking.model.airline.FlightOrder;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FlightOrderRepository extends CrudRepository<FlightOrder, Integer> {
    Optional<FlightOrder> findByFlightIdAndTouristIdAndOrderStatus(int flightId, int touristId, OrderStatus orderStatus);
    Optional<List<FlightOrder>> findByTouristId(int touristId);
}
