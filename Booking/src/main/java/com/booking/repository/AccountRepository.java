package com.booking.repository;

import com.booking.model.account.Account;
import com.booking.model.account.AccountType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.Optional;

@Repository
public interface AccountRepository extends CrudRepository<Account, Integer> {
    Optional<Account> findByUsername(String username);
    Optional<List<Account>> findByAccountType(AccountType accountType);
}
