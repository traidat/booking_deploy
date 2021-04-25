package com.booking.service;

import com.booking.model.OrderStatus;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentType;
import com.booking.model.hotel.Room;
import com.booking.model.hotel.RoomInfo;
import com.booking.model.hotel.RoomOrder;
import com.booking.repository.AgentRepository;
import com.booking.repository.RoomOrderRepository;
import com.booking.repository.RoomRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.*;
import java.text.SimpleDateFormat;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;

@RunWith(MockitoJUnitRunner.class)
public class HotelServiceTest {
    @Mock
    AgentRepository agentRepository;
    @Mock
    RoomRepository roomRepository;
    @Mock
    RoomOrderRepository roomOrderRepository;

    @InjectMocks
    HotelService hotelService;

    @Before
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void addRoom() {
    }

    @Test
    public void searchHotelAvailable() {
    }

    @Test
    public void getRoomAvailableInHotel() {
//        Room room1 = new Room(11,9,10.00,10,10, "Single", new ArrayList<>(), new HashSet<>());
//        Room room2 = new Room(15,9,20.00,10,10, "Double", new ArrayList<>(), new HashSet<>());
//        List<Room> rooms = new ArrayList<Room>() {{
//            add(room1);
//            add(room2);
//        }};
//        Mockito.when(hotelService.roomOrdered(anyInt(), any(), any())).thenAnswer(invocation -> {
//            Object roomID = invocation.getArguments()[1];
//            if (roomID.equals(11)) {
//                return 3;
//            } else {
//                return 1;
//            }
//        });
//        Mockito.when(roomRepository.findByAgentId(9)).thenReturn(Optional.of(rooms));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//        Date fromDate = new Date();
//        Date toDate = new Date();
//        try {
//          fromDate = formatter.parse("2021-03-01");
//          toDate = formatter.parse("2021-03-05");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        List<RoomInfo> roomInfos = hotelService.getRoomAvailableInHotel(9, fromDate, toDate);
//        assertEquals(2, roomInfos.size());
//        assertEquals(7, roomInfos.get(0).getNumberRoom());
//        assertEquals(9, roomInfos.get(1).getNumberRoom());
    }

//    @Test
//    public void roomOrdered() {
//
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
//        Date fromDate = new Date();
//        Date toDate = new Date();
//        try {
//            fromDate = formatter.parse("2021-03-01");
//            toDate = formatter.parse("2021-03-05");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        RoomOrder roomOrder1 = new RoomOrder(15, 1, 3, new Date(), OrderStatus.ORDER, 5, fromDate, toDate);
//        RoomOrder roomOrder2 = new RoomOrder(16, 1, 2, new Date(), OrderStatus.ORDER, 3, fromDate, toDate);
//        List<RoomOrder> roomOrderList = new ArrayList<RoomOrder>() {{
//            add(roomOrder1);
//            add(roomOrder2);
//        }};
//        Mockito.when((roomOrderRepository.findRoomOrdered(anyInt(),any(), any()))).thenReturn(Optional.of(roomOrderList));
//
//        assertEquals(hotelService.roomOrdered(1, fromDate, toDate), 8);
//
//    }

    @Test
    public void getHotelByCountryAndCity() {
        Agent agent = new Agent(4, 12, "Song Chanh hotel", "songchanh@gmail.com", "0945789165", "Quang Ninh", "Viet Nam",
                "12, Le Loi, Quang Yen", "Best hotel in Quang Yen", AgentType.HOTEL, new ArrayList<>());
        List<Agent> expect = new ArrayList<Agent>() {{
           add(agent);
        }};
        Mockito.when(agentRepository.findByAgentTypeAndCountryAndCity(AgentType.HOTEL, "Viet Nam", "Quang Ninh"))
                .thenReturn(Optional.of(expect));
        List<Agent> actual = hotelService.getHotelByCountryAndCity("Quang Ninh", "Viet Nam");
        assertEquals(expect.size(), actual.size());
        for (int i = 0; i < expect.size(); i++) {
            assertEquals(expect.get(i), actual.get(i));
        }
    }

    @Test
    public void orderRoom() {
    }

    @Test
    public void cancelRoomId() {
    }

    @Test
    public void getRoomOrderInfo() {
    }
}