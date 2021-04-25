package com.booking.controller;

import com.booking.model.Message;
import com.booking.model.address.Country;
import com.booking.service.AccountService;
import com.booking.service.AddressService;
import com.booking.service.HotelService;
import com.booking.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class GetDataController {
    @Autowired
    AccountService accountService;
    @Autowired
    JWTService jwtService;
    @Autowired
    AddressService addressService;
    @Autowired
    HotelService hotelService;

    @GetMapping("api/city")
    public ResponseEntity getCityByCountry(@RequestParam String country) {
        country.replace('+', ' ');
        return new ResponseEntity(accountService.getCityByCountry(country), HttpStatus.OK);
    }

    @GetMapping("api/country")
    public ResponseEntity getAllCountry() {
        return new ResponseEntity(accountService.getAllCountry(), HttpStatus.OK);
    }

    @GetMapping("api/agent/country")
    public ResponseEntity getCountry() {
        return new ResponseEntity(addressService.getAllCountry(), HttpStatus.OK);
    }

    @GetMapping("api/agent/city")
    public ResponseEntity getCity(@RequestParam String name) {
        Country country = addressService.getCountryByName(name);
        if (country != null) {
            return new ResponseEntity(addressService.getAllCityInCountry(country.getCountryId()), HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found country"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("api/agent/service")
    public  ResponseEntity getAllService() {
        return new ResponseEntity(hotelService.getAllServices(), HttpStatus.OK);
    }

}
