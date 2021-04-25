package com.booking.repository;

import com.booking.model.rating.Rating;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends CrudRepository<Rating, Integer> {
    Optional<List<Rating>> findByHotelId(int hotelID);
    Optional<Rating> findByOrderId(int orderId);
}
