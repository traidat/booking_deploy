package com.booking.repository;

import com.booking.model.payment.Payment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends CrudRepository<Payment, Integer> {
    Optional<Payment> findByOrderId(int orderID);
}
