package com.booking.service;

import com.booking.model.airline.Airport;
import com.booking.model.airline.Flight;
import com.booking.repository.AirportRepository;
import com.booking.repository.FlightOrderRepository;
import com.booking.repository.FlightRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.*;

@RunWith(MockitoJUnitRunner.class)
public class FlightServiceTest {
    @Mock
    FlightRepository flightRepository;
    @Mock
    AirportRepository airportRepository;
    @Mock
    FlightOrderRepository flightOrderRepository;

    @InjectMocks
    FlightService flightService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void addFlight() {

    }

    public Date convertDate(String stringDate) {
        SimpleDateFormat formatDate = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date date = new Date();
        try {
            date = formatDate.parse(stringDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return date;
    }

    @Test
    public void searchFlight() {
        Airport NoiBai = new Airport(1, "Noi Bai", "Ha Noi", "Viet Nam");
        Airport GiaLam = new Airport(4, "Gia Lam", "Ha Noi", "Viet Nam");
        Airport TanSonNhat = new Airport(2, "Tan Son Nhat", "Ho Chi Minh", "Viet Nam");
        List<Airport> from = new ArrayList<Airport>() {{
            add(TanSonNhat);
        }};
        List<Airport>  to = new ArrayList<Airport>() {{
           add(GiaLam);
           add(NoiBai);
        }};
        Optional<List<Airport>> fromAirport = Optional.of(from);
        Optional<List<Airport>> toAirport = Optional.of(to);
        Mockito.when(airportRepository.findByCityAndCountry("Ho Chi Minh", "Viet Nam")).thenReturn(fromAirport);
        Mockito.when(airportRepository.findByCityAndCountry("Ha Noi", "Viet Nam")).thenReturn(toAirport);
        Flight flight2 = new Flight(2,6,36,30.00,80,10.00,
                60,20.00,20,40.00,2,1,
                convertDate("2021-02-01 12:30:00"),convertDate("2021-02-01 13:30:00"));
        Flight flight3 = new Flight(3,7,40,30.00,80,10.00,
                60,20.00,20,40.00,2,1,
            convertDate("2021-02-01 11:30:00"), convertDate("2021-02-01 13:30:00"));
        Flight flight8 = new Flight(8,7,40,30.00,80,10.00,
                60,20.00,20,40.00,2,1,
                convertDate("2021-02-01 10:25:00"), convertDate("2021-02-01 11:25:00"));
        Flight flight9 = new Flight(9,7,40,30.00,80,10.00,
                60,20.00,20,40.00,2,1,
                convertDate("2021-02-01 10:25:00"),convertDate("2021-02-01 11:25:00"));
        Flight flight10 = new Flight(10,7,40,30.00,80,10.00,
                60,20.00,20,40.00,2,1,
                convertDate("2021-02-01 10:25:00"), convertDate("2021-02-01 11:25:00"));
        Flight flight11 = new Flight(11,7,40,30.00,80,10.00,
                60,20.00,20,40.00,2,4,
                convertDate("2021-02-01 10:25:00"),convertDate("2021-02-01 11:25:00"));

        List<Flight> flights1 = new ArrayList<Flight>() {{
            add(flight2);
            add(flight3);
            add(flight8);
            add(flight9);
            add(flight10);
        }};
        List<Flight> flights2 = new ArrayList<Flight>() {{
            add(flight11);
        }};
        Mockito.when(flightRepository.findByFromAirportAndToAirportAndStartTimeGreaterThanEqual(anyInt(), anyInt(), any()))
                .thenAnswer((Answer<Optional<List<Flight>>>) invocation -> {
                    Object to1 = invocation.getArguments()[1];
                    if (to1.equals(1)) {
                        return Optional.of(flights1);
                    } else if (to1.equals(4)){
                        return Optional.of(flights2);
                    }
                    return Optional.empty();
                });

        List<Flight> expect = new ArrayList<Flight>() {{
            add(flight11);
            add(flight2);
            add(flight3);
            add(flight8);
            add(flight9);
            add(flight10);

        }};
        List<Flight> actual = flightService.searchFlight("Ho Chi Minh", "Viet Nam",
                "Ha Noi", "Viet Nam", convertDate("2021-02-01 10:25"));
        assertEquals(expect.size(), actual.size());
        for (int i = 0 ; i < actual.size(); i++) {
            assertEquals(expect.get(i), actual.get(i));
        }
    }

    @Test
    public void orderFlight() {
    }

    @Test
    public void updateFlight() {
    }

    @Test
    public void cancelFlight() {
    }

    @Test
    public void getFlightOrderInfo() {
    }
}