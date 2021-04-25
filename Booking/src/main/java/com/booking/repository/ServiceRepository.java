package com.booking.repository;

import com.booking.model.Services;
import org.springframework.data.repository.CrudRepository;

public interface ServiceRepository extends CrudRepository<Services, Integer> {

}
