package com.booking.model;

import com.booking.model.account.AccountType;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class Token {
    private String token;

    private AccountType accountType;

}
