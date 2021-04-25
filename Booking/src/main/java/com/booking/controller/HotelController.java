package com.booking.controller;

import com.booking.model.OrderStatus;
import com.booking.model.account.Account;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentModify;
import com.booking.model.agent.AgentType;
import com.booking.model.hotel.*;
import com.booking.model.Message;
import com.booking.model.payment.PaymentStatus;
import com.booking.model.rating.Rating;
import com.booking.model.rating.RatingComment;
import com.booking.model.rating.RatingInfo;
import com.booking.model.rating.ReplyInfo;
import com.booking.model.tourist.Tourist;
import com.booking.service.AccountService;
import com.booking.service.ErrorService;
import com.booking.service.HotelService;
import com.booking.service.JWTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
public class HotelController {
    @Autowired
    HotelService hotelService;

    @Autowired
    AccountService accountService;

    @Autowired
    JWTService jwtService;


    @GetMapping("api/hotel/{id}")
    public ResponseEntity getHotelById(@PathVariable String id) {
        int agentId;
        try {
            agentId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found hotel"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        List<Agent> agents = new ArrayList<Agent>() {{
            add(hotelService.getHotelById(agentId));
        }};
        return new ResponseEntity(agents, HttpStatus.OK);
    }

    @PostMapping("api/agent/hotel/modify/{id}")
    public ResponseEntity modifyHotel(@Valid @RequestBody AgentModify agentModify, BindingResult bindingResult,
                                      @PathVariable String id) {
        int hotelId;
        try {
            hotelId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Hotel invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            Optional<Agent> agent = Optional.ofNullable(hotelService.getHotelById(hotelId));
            if (agent.get().getAgentId() == hotelId) {
                if (hotelService.modifyHotel(agentModify, hotelId)) {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Modify hotel success"));
                    }};
                    return new ResponseEntity(message, HttpStatus.OK);
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Modify hotel failed"));
                    }};
                    return new ResponseEntity(message, HttpStatus.CONFLICT);
                }
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Agent forbidden"));
                }};
                return new ResponseEntity(message, HttpStatus.FORBIDDEN);
            }
        }
    }

    @PostMapping("api/agent/hotel/room")
    public ResponseEntity addRoom(@Valid @RequestBody RoomInfo roomInfo, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            Optional<Agent> agent = Optional.ofNullable(hotelService.getHotelById(roomInfo.getHotelId()));
            if (hotelService.addRoom(roomInfo, agent.get().getAgentId())) {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Add room success"));
                }};
                return new ResponseEntity(message, HttpStatus.OK);
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Add room failed"));
                }};
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }

        }
    }

    @PostMapping("api/agent/hotel/room/modify/{id}")
    public ResponseEntity modifyRoom(@Valid @RequestBody RoomInfo roomInfo, BindingResult bindingResult,
                                     @PathVariable String id) {
        int roomId;
        try {
            roomId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Room invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            if (hotelService.modifyRoom(roomInfo, roomId)) {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Modify room success"));
                }};
                return new ResponseEntity(message, HttpStatus.OK);
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Modify room failed"));
                }};
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
        }
    }

    @PostMapping("api/agent/room/{id}")
    public ResponseEntity deleteRoom(@PathVariable String id) {
        int roomId;
        try {
            roomId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Room invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.deleteRoom(roomId), HttpStatus.OK);
    }

    @GetMapping("api/agent/room/{id}")
    public ResponseEntity getRoomById(@PathVariable String id) {
        int roomId;
        try {
            roomId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Room invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.getRoomById(roomId), HttpStatus.OK);
    }

    @GetMapping("api/hotel/room/{id}")
    public ResponseEntity searchRoomInHotel(@PathVariable String id, @RequestParam String fromDate,
                                            @RequestParam String toDate, @RequestParam String adult,
                                            @RequestParam String children, @RequestParam String minPrice,
                                            @RequestParam String maxPrice) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date start;
        Date end;
        int agentId;
        int numberOfAdult, numberOfChildren, priceMin, priceMax, starMin, starMax;
        try {
            numberOfAdult = Integer.parseInt(adult);
            numberOfChildren = Integer.parseInt(children);
            agentId = Integer.parseInt(id);
            start = formatter.parse(fromDate);
            end = formatter.parse(toDate);
            priceMin = Integer.parseInt(minPrice);
            priceMax = Integer.parseInt(maxPrice);
        } catch (ParseException e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Date not in right form"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.getRoomAvailableOfHotel(agentId, start, end, numberOfAdult,
                numberOfChildren, priceMin, priceMax), HttpStatus.OK);
    }

    @GetMapping("api/hotel_agent/room/{id}")
    public ResponseEntity searchRoomInHotelAgent(@PathVariable String id) {
        int agentId;
        agentId = Integer.parseInt(id);
        return new ResponseEntity(hotelService.getAllRoomOfHotel(agentId), HttpStatus.OK);
    }

    @GetMapping("api/hotel")
    public ResponseEntity searchHotel(@RequestParam String country, @RequestParam String city, @RequestParam String fromDate,
                                      @RequestParam String toDate, @RequestParam String adult, @RequestParam String children,
                                      @RequestParam String minPrice, @RequestParam String maxPrice) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        country.replace('+', ' ');
        city.replace('+', ' ');
        Date start;
        Date end;
        int numberOfAdult, numberOfChildren, priceMin, priceMax;
        try {
            numberOfAdult = Integer.parseInt(adult);
            numberOfChildren = Integer.parseInt(children);
            start = formatter.parse(fromDate);
            end = formatter.parse(toDate);
            priceMin = Integer.parseInt(minPrice);
            priceMax = Integer.parseInt(maxPrice);
        } catch (ParseException e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Date not in right form"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.searchHotelAvailable(city, country, start, end, numberOfAdult,
                numberOfChildren, priceMin, priceMax), HttpStatus.OK);
    }

    @GetMapping("api/agent/paid/{id}")
    public ResponseEntity paidOrder(@PathVariable String id) {
        int orderId;
        try {
            orderId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found order"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        if (hotelService.paidOrder(orderId)) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Paid success"));
            }};
            return new ResponseEntity(message, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Paid failed"));
            }};
            return new ResponseEntity(message, HttpStatus.CONFLICT);
        }

    }


    @PostMapping("api/hotel/order")
    public ResponseEntity orderHotelRoom(@Valid @RequestBody Order order, BindingResult bindingResult,
                                         HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(ErrorService.getError(bindingResult.getFieldErrors()), HttpStatus.BAD_REQUEST);
        } else {
            String token = jwtService.getJwtFromRequest(request);
            String username = jwtService.getUserNameFromJwtToken(token);
            Optional<Account> account = accountService.getAccount(username);
            Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date start;
            Date end;
            try {
                start = formatter.parse(order.getFromDate());
                end = formatter.parse(order.getToDate());
            } catch (ParseException e) {
                e.printStackTrace();
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Date not in right form"));
                }};
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }
            if (order.getPaymentStatus() == PaymentStatus.CASH) {
                order.setAccountNumber("");
                if (hotelService.orderRoom(tourist.get().getTouristId(), order.getAgentId(), order.getRoomId(),
                        order.getNumberRoom(), start, end, order.getPaymentStatus(), order.getAccountNumber(),
                        order.getAdult(), order.getChildren(), 0)) {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Order success"));
                    }};
                    return new ResponseEntity(message, HttpStatus.OK);
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Order failed"));
                    }};
                    return new ResponseEntity(message, HttpStatus.CONFLICT);
                }
            } else {
                if (hotelService.orderRoom(tourist.get().getTouristId(), order.getAgentId(), order.getRoomId(),
                        order.getNumberRoom(), start, end, order.getPaymentStatus(), order.getAccountNumber(),
                        order.getAdult(), order.getChildren(), 1)) {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Order success"));
                    }};
                    return new ResponseEntity(message, HttpStatus.OK);
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Order failed"));
                    }};
                    return new ResponseEntity(message, HttpStatus.CONFLICT);
                }
            }
        }
    }

    @PostMapping("api/hotel/cancel")
    public ResponseEntity cancelHotelRoom(@RequestParam String id) {
        int orderId;
        try {
            orderId = Integer.parseInt(id);
        } catch (Exception e) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found order"));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
        if (hotelService.cancelRoomId(orderId)) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Cancel success"));
            }};
            return new ResponseEntity(message, HttpStatus.OK);
        } else {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Cancel failed"));
            }};
            return new ResponseEntity(message, HttpStatus.CONFLICT);
        }
    }

//    @Scheduled(cron = "0 0 0 * * ?")
//    @PostMapping("api/agent/finish")
//    public ResponseEntity finishOrder(HttpServletRequest request) {
////        int orderId;
////        try {
////            orderId = Integer.parseInt(id);
////        } catch (Exception e) {
////            List<Message> message = new ArrayList<Message>() {{
////                add(new Message("Not found order"));
////            }};
////            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
////        }git
//        String token = jwtService.getJwtFromRequest(request);
//        String username = jwtService.getUserNameFromJwtToken(token);
//        Optional<Account> account = accountService.getAccount(username);
//        Optional<Agent> agent = accountService.getAgent(account.get().getId());
//        List<Message> message = new ArrayList<Message>();
//        if (agent.isPresent()) {
//            int agentId = agent.get().getAgentId();
//            List<RoomOrderInfo> list;
//            try {
//                list = hotelService.getRoomOrderInfoOfHotel(agentId, OrderStatus.ORDER);
//            } catch (Exception e) {
//                e.printStackTrace();
//                List<Message> messageErr = new ArrayList<Message>() {{
//                    add(new Message(e.getMessage()));
//                }};
//                return new ResponseEntity(messageErr, HttpStatus.NOT_FOUND);
//            }
//            for (RoomOrderInfo roomOrderInfo : list) {
//                if (roomOrderInfo.getToDate().toString().compareTo(new Date().toString()) > 0) {
//                    if (hotelService.finishOrder(roomOrderInfo.getOrderId(), agentId)) {
//                        message.add(new Message("Finish success order " + roomOrderInfo.getOrderId()));
//                    } else {
//                        message.add(new Message("Finish failed order " + roomOrderInfo.getOrderId()));
//                    }
//                }
//            }
//        } else {
//            List<Message> messageErr = new ArrayList<Message>() {{
//                add(new Message("Not found agent"));
//            }};
//            return new ResponseEntity(messageErr, HttpStatus.NOT_FOUND);
//        }
//        return  new ResponseEntity(message, HttpStatus.OK);
//    }

    @GetMapping("api/personal/hotel")
    public ResponseEntity getPersonalOrder(@RequestParam String status, HttpServletRequest request) {
        String token = jwtService.getJwtFromRequest(request);
        String username = jwtService.getUserNameFromJwtToken(token);
        Optional<Account> account = accountService.getAccount(username);
        Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
        OrderStatus orderStatus = OrderStatus.ORDER;
        try {
            orderStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            return new ResponseEntity(hotelService.getRoomOrderInfoOfTourist(tourist.get().getTouristId(), orderStatus), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message(e.getMessage()));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/admin/tourist/order")
    public ResponseEntity adminGetPersonalOrder(@RequestParam String status, @RequestParam String id) {
        int touristId;
        try {
            touristId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Tourist invalid"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        Optional<Tourist> tourist = accountService.getTourist(touristId);
        OrderStatus orderStatus = OrderStatus.ORDER;
        try {
            orderStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            return new ResponseEntity(hotelService.getRoomOrderInfoOfTourist(tourist.get().getTouristId(), orderStatus), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message(e.getMessage()));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/admin/all/order")
    public ResponseEntity getAllOrderInfo() {
        try {
            return new ResponseEntity(hotelService.getAllOrderInfo(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message(e.getMessage()));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("api/agent/hotel")
    public ResponseEntity getRoomOrderInfo(@RequestParam String status, @RequestParam String id) {
        int hotelId;
        try {
            hotelId = Integer.parseInt(id);
        } catch (Exception e) {
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Invalid hotel"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        OrderStatus orderStatus = OrderStatus.ORDER;
        try {
            orderStatus = OrderStatus.valueOf(status.toUpperCase());
        } catch (Exception e) {
            e.printStackTrace();
        }
        try {
            return new ResponseEntity(hotelService.getRoomOrderInfoOfHotel(hotelId, orderStatus), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message(e.getMessage()));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping("api/rating")
    public ResponseEntity addRating(@Valid @RequestBody RatingComment ratingComment, BindingResult bindingResult,
                                    @RequestParam String hotel, @RequestParam String order, HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            int hotelId;
            int orderId;
            try {
                hotelId = Integer.parseInt(hotel);
                orderId = Integer.parseInt(order);
            } catch (Exception e) {
                e.printStackTrace();
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Not found hotel"));
                }};
                return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
            }

            String token = jwtService.getJwtFromRequest(request);
            String username = jwtService.getUserNameFromJwtToken(token);
            Optional<Account> account = accountService.getAccount(username);
            Optional<Tourist> tourist = accountService.getTourist(account.get().getId());
            if (hotelService.addRating(orderId, tourist.get().getTouristId(), hotelId, ratingComment.getRating(),
                    ratingComment.getComment())) {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Add rate success"));
                }};
                return new ResponseEntity(message, HttpStatus.OK);
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("Add rate failed"));
                }};
                return new ResponseEntity(message, HttpStatus.CONFLICT);
            }
        }
    }

    @GetMapping("api/hotel/rating/{hotel}")
    public ResponseEntity getRatingOfHotel(@PathVariable String hotel) {
        int hotelId;
        try {
            hotelId = Integer.parseInt(hotel);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found hotel"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        List<RatingInfo> ratingInfos = new ArrayList<RatingInfo>() {{
            add(hotelService.ratingInfo(hotelId));
        }};
        return new ResponseEntity(ratingInfos, HttpStatus.OK);
    }

    @GetMapping("api/hotel/all_rate/{hotel}")
    public ResponseEntity getAllRatingOfHotel(@PathVariable String hotel) {
        int hotelId;
        try {
            hotelId = Integer.parseInt(hotel);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found hotel"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.allRateOfHotel(hotelId), HttpStatus.OK);
    }


    @GetMapping("api/rating/{id}")
    public  ResponseEntity getRatingByOrderID(@PathVariable String id) {
        int orderId;
        try {
            orderId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        try {
            List<Rating> ratings = new ArrayList<Rating>() {{
                add(hotelService.getRatingByOrderId(orderId));
            }};
            return new ResponseEntity(ratings, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message(e.getMessage()));
            }};
            return new ResponseEntity(message, HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("api/reply/{id}")
    public ResponseEntity getAllReply(@PathVariable String id) {
        int hotelId;
        try {
            hotelId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found hotel"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.getAllReplyOfHotel(hotelId), HttpStatus.OK);
    }

    @GetMapping("api/reply/rating/{id}")
    public ResponseEntity getReplyByRatingId(@PathVariable String id) {
        int ratingId;

        try {
            ratingId = Integer.parseInt(id);
        } catch (Exception e) {
            e.printStackTrace();
            List<Message> message = new ArrayList<Message>() {{
                add(new Message("Not found rating"));
            }};
            return new ResponseEntity(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(hotelService.getReplyOfRating(ratingId), HttpStatus.OK);
    }

    @PostMapping("api/agent/reply")
    public ResponseEntity addReply(@Valid @RequestBody ReplyInfo replyInfo, BindingResult bindingResult,
                                   HttpServletRequest request) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<Object>(ErrorService.getError(bindingResult.getFieldErrors()),
                    HttpStatus.BAD_REQUEST);
        } else {
            String token = jwtService.getJwtFromRequest(request);
            String username = jwtService.getUserNameFromJwtToken(token);
            Optional<Account> account = accountService.getAccount(username);
            Agent optionalAgent = hotelService.getHotelById(replyInfo.getHotelId());
            if (optionalAgent.getAccountId() == account.get().getId()) {
                if (optionalAgent.getAgentId() == replyInfo.getHotelId() && hotelService.addReply(replyInfo)) {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Reply success"));
                    }};
                    return new ResponseEntity(message, HttpStatus.OK);
                } else {
                    List<Message> message = new ArrayList<Message>() {{
                        add(new Message("Reply failed"));
                    }};
                    return new ResponseEntity(message, HttpStatus.CONFLICT);
                }
            } else {
                List<Message> message = new ArrayList<Message>() {{
                    add(new Message("User forbidden"));
                }};
                return new ResponseEntity(message, HttpStatus.FORBIDDEN);
            }
        }
    }
}
