package com.booking.repository;

import com.booking.model.touristArea.Ticket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Integer> {
    Optional<List<Ticket>> findByNameContaining(String name);
}
