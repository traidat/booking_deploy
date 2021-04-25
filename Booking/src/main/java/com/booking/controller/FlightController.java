package com.booking.controller;

import com.booking.model.Message;
import com.booking.model.account.Account;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentType;
import com.booking.model.airline.FlightInfo;
import com.booking.model.airline.FlightSeat;
import com.booking.model.airline.FlightSearch;
import com.booking.model.tourist.Tourist;
import com.booking.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class FlightController {
    @Autowired
    FlightService flightService;

    @Autowired
    JWTService jwtService;

    @Autowired
    AccountService accountService;

//    @PostMapping("api/agent/flight")
//    public ResponseEntity addFlight(@RequestBody @Valid FlightInfo flightInfo, BindingResult bindingResult,
//                                    HttpServletRequest request) {
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
//                    HttpStatus.BAD_REQUEST);
//        } else {
//            String token = jwtService.getJwtFromRequest(request);
//            String username = jwtService.getUserNameFromJwtToken(token);
//            Optional<Account> account = accountService.getAccount(username);
//            Optional<Agent> agent = accountService.getAgent(account.get().getId());
//            if (agent.get().getAgentType() == AgentType.AIRLINE) {
//                if (flightService.addFlight(flightInfo, agent.get().getAgentId())) {
//                    Message message = new Message("Add flight success");
//                    return new ResponseEntity(message, HttpStatus.OK);
//                } else {
//                    Message message = new Message("Add flight failed");
//                    return new ResponseEntity(message, HttpStatus.CONFLICT);
//                }
//            } else {
//                Message message = new Message("Agent forbidden");
//                return new ResponseEntity(message, HttpStatus.FORBIDDEN);
//            }
//
//        }
//    }

    @PostMapping("api/flight/airport")
    public ResponseEntity searchFlight(@RequestBody @Valid FlightSearch flightSearch, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else{
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            Date start;
            try {
                start = formatter.parse(flightSearch.getStartTime());
            } catch (ParseException e) {
                e.printStackTrace();
                Message message = new Message("Date not in right form");
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity(flightService.searchFlight(flightSearch.getFromCity(), flightSearch.getFromCountry(),
                    flightSearch.getToCity(), flightSearch.getToCountry(), start), HttpStatus.OK);
        }
    }

    @PostMapping("api/flight/order/{id}")
    public ResponseEntity orderFlight(@PathVariable String id, @RequestBody FlightSeat flightSeat, HttpServletRequest request) {
        int flightId;
        try {
            flightId = Integer.parseInt(id);
        } catch (Exception e) {
            Message message = new Message("Not found flight");
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
        if (flightService.orderFlight(flightId, flightSeat, tourist.get().getTouristId())) {
            Message message = new Message("Order success");
            return new ResponseEntity(message, HttpStatus.OK);
        } else {
            Message message = new Message("Order failed");
            return new ResponseEntity(message, HttpStatus.CONFLICT);
        }
    }

    @PostMapping("api/flight/cancel/{id}")
    public ResponseEntity cancelFlight(@PathVariable String id, HttpServletRequest request) {
        int flightId;
        try {
            flightId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            Message message = new Message("Invalid flight");
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
        if (flightService.cancelFlight(flightId, tourist.get().getTouristId())) {
            Message message = new Message("Cancel success");
            return new ResponseEntity(message, HttpStatus.OK);
        } else {
            Message message = new Message("Cancel failed");
            return new ResponseEntity(message, HttpStatus.CONFLICT);
        }
    }

    @GetMapping("api/flight/personal")
    public ResponseEntity getPersonalFlight(HttpServletRequest request) {
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
        return new ResponseEntity(flightService.getFlightOrderInfo(tourist.get().getTouristId()), HttpStatus.OK);
    }

}
