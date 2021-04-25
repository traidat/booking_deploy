package com.booking.repository;

import com.booking.model.tourist.Tourist;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TouristRepository extends CrudRepository<Tourist, Integer> {
    Optional<Tourist> findByAccountId(int id);
    Optional<Tourist> findByEmail(String email);
    Iterable<Tourist> findAll ();
}
