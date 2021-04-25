package com.booking.service;

import com.booking.model.OrderStatus;
import com.booking.model.agent.Agent;
import com.booking.model.airline.*;
import com.booking.model.payment.PaymentStatus;
import com.booking.repository.AgentRepository;
import com.booking.repository.AirportRepository;
import com.booking.repository.FlightOrderRepository;
import com.booking.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class FlightService {
    @Autowired
    FlightRepository flightRepository;
    @Autowired
    AirportRepository airportRepository;
    @Autowired
    FlightOrderRepository flightOrderRepository;
    @Autowired
    PaymentService paymentService;
    @Autowired
    AgentRepository agentRepository;

    public boolean addFlight(FlightInfo flightInfo, int agentId) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        Date startTime = new Date();
        Date endTime = new Date();
        try {
            startTime = formatDate.parse(flightInfo.getStartTime());
            endTime = formatDate.parse(flightInfo.getEndTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
//        String formattedDateString = formatDate.format(endTime);

        Flight flight = new Flight(agentId, flightInfo.getBusinessSeat(), flightInfo.getBusinessPrice(),
                flightInfo.getEconomySeat(), flightInfo.getEconomyPrice(), flightInfo.getPremiumSeat(),
                flightInfo.getPremiumPrice(), flightInfo.getFirstClassSeat(), flightInfo.getFirstClassPrice(),
                flightInfo.getFromAirport(), flightInfo.getToAirport(), startTime, endTime);
        try {
            flightRepository.save(flight);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Flight> searchFlight(String fromCity, String fromCountry, String toCity, String toCountry, Date startTime) {
        Optional<List<Airport>> from = airportRepository.findByCityAndCountry(fromCity, fromCountry);
        Optional<List<Airport>> to = airportRepository.findByCityAndCountry(toCity, toCountry);

        List<Flight> flights = new ArrayList<>();
        if (from.isPresent() && to.isPresent()) {
            List<Airport> fromAirport = from.get();
            List<Airport> toAirport = to.get();
            for (Airport airport : fromAirport) {
                for (Airport value : toAirport) {
                    Optional<List<Flight>> listFlight =
                            flightRepository.findByFromAirportAndToAirportAndStartTimeGreaterThanEqual(
                                    airport.getAirportId(), value.getAirportId(), startTime);
                    if (listFlight.isPresent()) {
                        flights.addAll(listFlight.get());
                    }
                }
            }
        }
        return flights;
    }

    public boolean orderFlight(int flightId, FlightSeat flightSeat, int touristId) {
        Optional<FlightOrder> orderedFlight =
                flightOrderRepository.findByFlightIdAndTouristIdAndOrderStatus(flightId, touristId, OrderStatus.ORDER);
        Agent agent = agentRepository.findById(flightRepository.findByFlightId(flightId).get().getAgentId()).get();
        FlightOrder flightOrder;
        if (orderedFlight.isPresent()) {
            flightOrder = orderedFlight.get();
            flightOrder.setBusinessSeat(flightSeat.getBusinessSeat());
            flightOrder.setEconomySeat(flightSeat.getEconomySeat());
            flightOrder.setPremiumSeat(flightSeat.getPremiumSeat());
            flightOrder.setFirstClassSeat(flightSeat.getFirstClassSeat());
            flightOrder.setOrderStatus(OrderStatus.ORDER);
            return saveOrder(flightId, flightSeat, touristId, agent, flightOrder);
        } else {
            flightOrder = new FlightOrder(touristId, flightId, new Date(), OrderStatus.ORDER,
                    flightSeat.getBusinessSeat(), flightSeat.getEconomySeat(), flightSeat.getPremiumSeat(),
                    flightSeat.getFirstClassSeat());
            return saveOrder(flightId, flightSeat, touristId, agent, flightOrder);
        }

    }

    private boolean saveOrder(int flightId, FlightSeat flightSeat, int touristId, Agent agent, FlightOrder flightOrder) {
        if (flightSeat.getPaymentStatus() == PaymentStatus.CASH) {
            flightSeat.setAccountNumber("");
        }
        try {
            flightOrderRepository.save(flightOrder);
            paymentService.addPayment(flightOrder.getOrderId(), touristId, agent.getAgentId(),
                    flightSeat.getPaymentStatus(), flightSeat.getAccountNumber());
            if (updateFlight(flightSeat, flightId)) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateFlight(FlightSeat flightSeat, int flightId) {
        Optional<Flight> optionalFlight = flightRepository.findById(flightId);
        if (optionalFlight.isPresent()) {
            Flight flight = optionalFlight.get();
            int businessSeat = flight.getBusinessSeat() - flightSeat.getBusinessSeat();
            int economySeat = flight.getEconomySeat() - flightSeat.getEconomySeat();
            int premiumSeat = flight.getPremiumSeat() - flightSeat.getPremiumSeat();
            int firstClassSeat = flight.getFirstClassSeat() - flightSeat.getFirstClassSeat();
            if (businessSeat >= 0 && economySeat >= 0 && premiumSeat >= 0 && firstClassSeat >= 0) {
                flight.setBusinessSeat(businessSeat);
                flight.setEconomySeat(economySeat);
                flight.setPremiumSeat(premiumSeat);
                flight.setFirstClassSeat(firstClassSeat);
                try {
                    flightRepository.save(flight);
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public boolean cancelFlight(int flightId, int touristId) {
        Optional<FlightOrder> orderedFlight =
                flightOrderRepository.findByFlightIdAndTouristIdAndOrderStatus(flightId, touristId, OrderStatus.ORDER);
        if (orderedFlight.isPresent()) {
            FlightOrder flightOrder = orderedFlight.get();
            flightOrder.setOrderStatus(OrderStatus.CANCEL);
            FlightSeat flightSeat = new FlightSeat();
            flightSeat.setBusinessSeat(-flightOrder.getBusinessSeat());
            flightSeat.setEconomySeat(-flightOrder.getEconomySeat());
            flightSeat.setPremiumSeat(-flightOrder.getPremiumSeat());
            flightSeat.setFirstClassSeat(-flightOrder.getFirstClassSeat());
            try {
                flightOrderRepository.save(flightOrder);
                paymentService.cancelPayment(flightOrder.getOrderId());
                if (updateFlight(flightSeat, flightId)) {
                    return true;
                } else {
                    return false;
                }
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    

    public List<FlightOrderInfo> getFlightOrderInfo(int touristId) {
        Optional<List<FlightOrder>> optionalFlightOrders = flightOrderRepository.findByTouristId(touristId);
        List<FlightOrder> flightOrders;
        if (optionalFlightOrders.isPresent()) {
            flightOrders = optionalFlightOrders.get();
            List<FlightOrderInfo> flightOrderInfos = new ArrayList<>();
            for (int i = 0; i < flightOrders.size(); i++) {
                FlightOrder flightOrder = flightOrders.get(i);
                Flight flight = flightRepository.findByFlightId(flightOrder.getFlightId()).get();
                Airport fromAirport = airportRepository.findById(flight.getFromAirport()).get();
                Airport toAirport = airportRepository.findById(flight.getToAirport()).get();
                FlightOrderInfo flightOrderInfo = new FlightOrderInfo(flight.getFlightId(), fromAirport, toAirport,
                        flight.getStartTime(), flight.getEndTime(), flightOrder.getBusinessSeat(), flightOrder.getEconomySeat(),
                        flightOrder.getPremiumSeat(), flightOrder.getFirstClassSeat(), flightOrder.getOrderStatus(),
                        flightOrder.getOrderDate());
                flightOrderInfos.add(flightOrderInfo);
            }
            return flightOrderInfos;
        } else {
            return new ArrayList<>();
        }
    }

}
