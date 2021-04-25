package com.booking.model.account;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class AccountPassword {

    @NotNull
    @Size(min = 3, max = 45)
    private String oldPass;

    @NotNull
    @Size(min = 3, max = 45)
    private String newPass;
}
