package com.booking.service;

import com.booking.model.touristArea.Ticket;
import com.booking.model.touristArea.TicketInformation;
import com.booking.repository.TicketRepository;
import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TicketService {
    @Autowired
    TicketRepository ticketRepository;

    public boolean addTicket(TicketInformation ticketInformation, int agentId) {
        Ticket ticket = new Ticket(agentId, ticketInformation.getName(), ticketInformation.getPrice(),
                ticketInformation.getAmount(), ticketInformation.getDate());
        try {
            ticketRepository.save(ticket);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Ticket> getTicketByName(String name) {
        Optional<List<Ticket>> tickets = ticketRepository.findByNameContaining(name);
        if (tickets.isPresent()) {
            return tickets.get();
        } else {
            return new ArrayList<>();
        }
    }
}
