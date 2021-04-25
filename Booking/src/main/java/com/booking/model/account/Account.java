package com.booking.model.account;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private int id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "account_type")
    private AccountType accountType;

    public Account(String username, String password, AccountType accountType) {
        this.username = username;
        this.password = password;
        this.accountType = accountType;
    }
}
