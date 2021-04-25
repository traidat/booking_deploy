package com.booking.repository;

import com.booking.model.address.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends CrudRepository<Country, Integer> {
    Iterable<Country> findAll();

    Optional<Country> findByCountryName(String countryName);

}
