package com.booking.model.account;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
public class AccountLogin {
    @NotNull
    @Size(min = 3, max = 45)
    private String username;

    @NotNull
    @Size(min = 0, max = 45)
    private String password;
}
