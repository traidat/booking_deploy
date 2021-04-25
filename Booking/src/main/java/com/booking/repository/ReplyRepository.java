package com.booking.repository;

import com.booking.model.rating.Reply;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReplyRepository extends CrudRepository<Reply, Integer> {
    Optional<List<Reply>> findByHotelId(int hotelId);
    Optional<Reply> findByRatingId(int ratingId);
}
