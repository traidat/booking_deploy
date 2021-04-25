package com.booking.service;

import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentType;
import com.booking.model.airline.Flight;
import com.booking.model.airline.FlightOrder;
import com.booking.model.hotel.Room;
import com.booking.model.hotel.RoomOrder;
import com.booking.model.payment.Payment;
import com.booking.model.payment.PaymentStatus;
import com.booking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    AgentRepository agentRepository;
    @Autowired
    RoomOrderRepository roomOrderRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    PaymentRepository paymentRepository;
    @Autowired
    FlightOrderRepository flightOrderRepository;
    @Autowired
    FlightRepository flightRepository;

    public boolean addPayment(int orderId, int touristId, int agentId, PaymentStatus paymentStatus, String accountNumber) {
        Agent agent = agentRepository.findById(agentId).get();
        if (agent.getAgentType() == AgentType.HOTEL) {
            Optional<RoomOrder> optionalRoomOrder = roomOrderRepository.findById(orderId);
            RoomOrder roomOrder;
            Room room;
            if (optionalRoomOrder.isPresent()) {
                 roomOrder = optionalRoomOrder.get();
                 Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
                 if (optionalRoom.isPresent()) {
                     room = optionalRoom.get();
                 } else {
                     return false;
                 }
            } else {
                return false;
            }
            Optional<Payment> optionalPayment = paymentRepository.findByOrderId(orderId);
            if (optionalPayment.isPresent()) {
                Payment payment = optionalPayment.get();
                payment.setTransfer(room.getPrice() * roomOrder.getNumberRoom());
                if (paymentStatus == PaymentStatus.CREDIT_CARD) {
                    payment.setAccountNumber(accountNumber);
                }
                try {
                    paymentRepository.save(payment);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else {
                Payment payment = new Payment(touristId,  orderId, agentId, paymentStatus, room.getPrice() * roomOrder.getNumberRoom());
                try {
                    paymentRepository.save(payment);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            }
        } else {
            FlightOrder flightOrder = flightOrderRepository.findById(orderId).get();
            Flight flight = flightRepository.findById(flightOrder.getFlightId()).get();
            Payment payment = new Payment(touristId,  orderId, agentId, paymentStatus, flightOrder.getBusinessSeat() * flight.getBusinessPrice() +
                    flightOrder.getEconomySeat() * flight.getEconomyPrice() + flightOrder.getFirstClassSeat() * flight.getFirstClassPrice() +
                    flightOrder.getPremiumSeat() * flight.getPremiumPrice());
            try {
                paymentRepository.save(payment);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
    }

    public boolean cancelPayment(int orderId) {
        Optional<Payment> optionalPayment = paymentRepository.findByOrderId(orderId);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            payment.setPaymentStatus(PaymentStatus.CANCEL);
            try {
                paymentRepository.save(payment);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    public Payment getPaymentByOrderId(int orderId) {
        Optional<Payment> optionalPayment = paymentRepository.findByOrderId(orderId);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            return payment;
        } else {
            return null;
        }
    }
}
