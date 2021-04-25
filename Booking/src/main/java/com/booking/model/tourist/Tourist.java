package com.booking.model.tourist;

import com.booking.model.Image;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "tourist")
@Data
@NoArgsConstructor
public class Tourist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tourist_id")
    private int touristId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private int age;

    @Column(name = "phone")
    private String phone;

    @OneToOne
    @JoinColumn(name = "image_id")
    private Image image;

    public Tourist(int accountId, String name, String email, int age, String phone) {
        this.accountId = accountId;
        this.name = name;
        this.email = email;
        this.age = age;
        this.phone = phone;
    }
}
