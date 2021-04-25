package com.booking.repository;

import com.booking.model.address.City;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends CrudRepository<City, Integer> {


    Optional<List<City>> findByCountryId(int countryId);
}
