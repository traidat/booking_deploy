package com.booking.repository;

import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentType;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface AgentRepository extends CrudRepository<Agent, Integer> {
    Optional<List<Agent>> findByAccountId(int id);
    Optional<Agent> findByAgentId(int id);
    Optional<Agent> findByEmail(String email);
    Optional<List<Agent>> findByAgentType(AgentType agentType);
    Optional<List<Agent>> findByAgentTypeAndCountryAndCity(AgentType agentType, String country, String city);

    @Query(value = "Select city from agent where country = :country", nativeQuery = true)
    Optional<List<String>> findCityByCountry(String country);

    @Query(value = "Select distinct country from agent", nativeQuery = true)
    Optional<List<String>> findAllCountry();

    @Modifying
    @Query(value = "update agent set name = :name, phone = :phone, email = :email, address = :address, city = :city," +
            "country = :country, description = :description where agent_id = :hotelId", nativeQuery = true)
    int updateHotel (String name, String phone, String email, String address, String city, String country, String description, int hotelId);


}
