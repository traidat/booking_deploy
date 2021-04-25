package com.booking.controller;

import com.booking.model.Message;
import com.booking.model.account.Account;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentType;
import com.booking.model.touristArea.TicketInformation;
import com.booking.service.AccountService;
import com.booking.service.ErrorService;
import com.booking.service.JWTService;
import com.booking.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@RestController
public class TouristAreaController {
    @Autowired
    JWTService jwtService;

    @Autowired
    AccountService accountService;

    @Autowired
    TicketService ticketService;

//    @PostMapping("api/agent/ticket")
//    public ResponseEntity addTicket(@Valid @RequestBody TicketInformation ticketInformation, BindingResult bindingResult,
//                                    HttpServletRequest request) {
//        if (bindingResult.hasErrors()) {
//            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
//                    HttpStatus.BAD_REQUEST);
//        } else {
//            String token = jwtService.getJwtFromRequest(request);
//            String username = jwtService.getUserNameFromJwtToken(token);
//            Optional<Account> account = accountService.getAccount(username);
//            Optional<Agent> agent = accountService.getAgent(account.get().getId());
//            if (agent.get().getAgentType() == AgentType.TOURIST_AREA) {
//                if (ticketService.addTicket(ticketInformation, agent.get().getAgentId())) {
//                    Message message = new Message("Add ticket success");
//                    return new ResponseEntity(message, HttpStatus.OK);
//                } else {
//                    Message message = new Message("Add ticket failed");
//                    return new ResponseEntity(message, HttpStatus.CONFLICT);
//                }
//            } else {
//                Message message = new Message("Agent forbidden");
//                return new ResponseEntity(message, HttpStatus.FORBIDDEN);
//            }
//        }
//    }

    @GetMapping("api/area")
    public ResponseEntity searchByName(@RequestParam String name) {
        return new ResponseEntity(ticketService.getTicketByName(name), HttpStatus.OK);
    }
}
