package com.booking.service;

import com.booking.model.Image;
import com.booking.model.OrderStatus;
import com.booking.model.account.AccountType;
import com.booking.model.agent.Agent;
import com.booking.model.agent.AgentModify;
import com.booking.model.agent.AgentType;
import com.booking.model.hotel.*;
import com.booking.model.Services;
import com.booking.model.payment.Payment;
import com.booking.model.payment.PaymentStatus;
import com.booking.model.rating.*;
import com.booking.model.tourist.Tourist;
import com.booking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.ZoneId;
import java.util.*;

@Service
public class HotelService {
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    AgentRepository agentRepository;
    @Autowired
    RoomOrderRepository roomOrderRepository;
    @Autowired
    PaymentService paymentService;
    @Autowired
    RatingRepository ratingRepository;
    @Autowired
    TouristRepository touristRepository;
    @Autowired
    ImageRepository imageRepository;
    @Autowired
    ReplyRepository replyRepository;
    @Autowired
    AccountService accountService;

    public boolean addRoom(RoomInfo roomInfo, int agentId) {
        Room room = new Room(agentId, roomInfo.getPrice(), roomInfo.getAdult(), roomInfo.getChildren(),
                roomInfo.getRoomName(), roomInfo.getNumberRoom());
        List<Integer> listService = roomInfo.getServices();
        List<Services> services = new ArrayList<>();
        for (int i : listService) {
            Optional<Services> s = serviceRepository.findById(i);
            if (s.isPresent()) {
                services.add(s.get());
            }
        }
        room.setServices(services);
        Set<Image> images = new HashSet<>();
        Set<String> url = roomInfo.getUrl();
        if (url != null) {
            for (String s : url) {
                Image image = new Image();
                image.setUrl(s);
                imageRepository.save(image);
                images.add(image);
            }
            room.setImages(images);
        }
        try {
            roomRepository.save(room);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean modifyRoom(RoomInfo roomInfo, int roomId) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        if (optionalRoom.isPresent()) {
            Room room = optionalRoom.get();
            room.setRoomName(roomInfo.getRoomName());
            room.setPrice(roomInfo.getPrice());
            room.setAdult(roomInfo.getAdult());
            room.setChildren(roomInfo.getChildren());
            room.setNumberRoom(roomInfo.getNumberRoom());
            List<Integer> listService = roomInfo.getServices();
            List<Services> services = new ArrayList<>();
            if (listService != null) {
                for (int i : listService) {
                    Optional<Services> s = serviceRepository.findById(i);
                    if (s.isPresent()) {
                        services.add(s.get());
                    }
                }
            }
            room.setServices(services);
            try {
                roomRepository.save(room);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }

    @Transactional
    public boolean modifyHotel(AgentModify agentModify, int hotelId) {
        Optional<Agent> optionalAgent = agentRepository.findByAgentId(hotelId);
        if (optionalAgent.isPresent()) {
            Agent agent = optionalAgent.get();
            agent.setName(agentModify.getName());
            agent.setPhone(agentModify.getPhone());
            agent.setAddress(agentModify.getAddress());
            agent.setCity((agentModify.getCity()));
            agent.setCountry((agentModify.getCountry()));
            agent.setDescription(agentModify.getDescription());
            agent.setEmail(agentModify.getEmail());
            List<Integer> listService = agentModify.getServices();
            List<Services> services = new ArrayList<>();
            if (listService != null) {
                for (Integer integer : listService) {
                    Optional<Services> s = serviceRepository.findById(integer);
                    if (s.isPresent()) {
                        services.add(s.get());
                    }
                }
                agent.setServices(services);
            }
            try {
                agentRepository.save(agent);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            return false;
        }
    }



    public Agent getHotelById(int id) {
        Optional<Agent> hotel = agentRepository.findByAgentId(id);
        if (hotel.isPresent()) {
            return hotel.get();
        } else {
            return new Agent();
        }
    }



    public boolean deleteRoom(int roomId) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);
        Optional<List<RoomOrder>> optionalRoomOrder = roomOrderRepository.findByRoomId(roomId);
        Room room;
        List<RoomOrder> roomOrders;
        if (optionalRoom.isPresent() && optionalRoomOrder.isPresent()) {
            room = optionalRoom.get();
            roomOrders = optionalRoomOrder.get();
        } else {
            return false;
        }
        room.setImages(new HashSet<>());
        room.setServices(new ArrayList<>());
        try {
            roomRepository.delete(room);
            for (RoomOrder roomOrder : roomOrders) {
                roomOrderRepository.delete(roomOrder);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Room> getRoomById(int id) {
        Optional<Room> room = roomRepository.findById(id);
        List<Room> list = new ArrayList<>();
        if (room.isPresent()) {
            list.add(room.get());
        }
        return list;
    }

    public List<Agent> searchHotelAvailable(String city, String country, Date fromDate, Date toDate, int adult, int children,
                                            int minPrice, int maxPrice) {
        List<Agent> hotels = getHotelByCountryAndCity(city, country);
        for (int i = 0; i < hotels.size(); i++) {
            if (getRoomAvailableOfHotel(hotels.get(i).getAgentId(),
                    fromDate, toDate, adult, children, minPrice, maxPrice).size() == 0) {
                hotels.remove(i);
                i--;
            } else if (accountService.getAccount(hotels.get(i).getAccountId()).get().getAccountType() == AccountType.AGENT_BANNED) {
                hotels.remove(i);
                i--;
            }
        }
        return hotels;
    }

    public List<RoomInfo> getRoomAvailableOfHotel(int agentId, Date fromDate, Date toDate, int adult, int children, int minPrice,
                                                  int maxPrice) {
        Optional<List<Room>> optionalRoomList = roomRepository.findByAgentId(agentId);
        List<Room> rooms;
        if (optionalRoomList.isPresent()) {
            rooms = optionalRoomList.get();
        } else {
            return new ArrayList<>();
        }
        List<RoomInfo> roomAvailable = new ArrayList<>();
        for (Room r : rooms) {
            RoomInfo roomInfo = new RoomInfo(r.getRoomId(), r.getPrice(), r.getAdult(), r.getChildren(), r.getRoomName(),
                    r.getServices(), r.getNumberRoom() - roomOrdered(r.getRoomId(), fromDate, toDate), r.getImages());
            if (r.getNumberRoom() - roomOrdered(r.getRoomId(), fromDate, toDate) > 0
                    && r.getAdult() == adult && r.getChildren() >= children
                    && r.getPrice() >= minPrice && r.getPrice() <= maxPrice) {
                roomAvailable.add(roomInfo);
            }
        }
        return roomAvailable;
    }

    public List<Room> getAllRoomOfHotel(int agentId) {
        Optional<List<Room>> listRoom = roomRepository.findByAgentId(agentId);
        if (listRoom.isPresent()) {
            return listRoom.get();
        } else {
            return new ArrayList<>();
        }

    }

    public Rating getRatingByOrderId(int orderId) {
        Optional<Rating> optionalRating = ratingRepository.findByOrderId(orderId);
        if (optionalRating.isPresent()) {
            return optionalRating.get();
        } else {
           return null;
        }
    }

    public int roomOrdered(int room_id, Date fromDate, Date toDate) {
        Optional<List<RoomOrder>> roomOrderList = roomOrderRepository.findRoomOrdered(room_id,
                fromDate,
                toDate);
        if (roomOrderList.isPresent()) {
            List<RoomOrder> roomOrders = roomOrderList.get();
            int roomOrdered = 0;
            for (RoomOrder roomOrder : roomOrders) {
                if (roomOrder.getOrderStatus() == OrderStatus.ORDER)
                    roomOrdered = roomOrdered + roomOrder.getNumberRoom();
            }
            return roomOrdered;
        } else {
            return 0;
        }
    }

    public List<Agent> getHotelByCountryAndCity(String city, String country) {
        Optional<List<Agent>> hotels = agentRepository.findByAgentTypeAndCountryAndCity(AgentType.HOTEL, country, city);
        if (hotels.isPresent()) {
            return hotels.get();
        } else {
            return new ArrayList<>();
        }
    }

    public boolean orderRoom(int touristId, int agentId, int roomId, int numberRoom, Date fromDate, Date toDate,
                             PaymentStatus paymentStatus, String accountNumber, int adult, int children, int isPaid) {
        List<RoomInfo> listRoom = getRoomAvailableOfHotel(agentId, fromDate, toDate, adult, children, 0, 10000);
        Optional<RoomOrder> optionalRoomOrder =
                roomOrderRepository.findPersonalOrdered(touristId, roomId, OrderStatus.ORDER, fromDate, toDate);
        for (RoomInfo roomInfo : listRoom) {
            if (roomInfo.getRoomId() == roomId) {
                if (roomInfo.getNumberRoom() < numberRoom) {
                    return false;
                } else if (optionalRoomOrder.isPresent()) {
                    RoomOrder roomOrder = optionalRoomOrder.get();
                    if (roomOrder.getOrderStatus() == OrderStatus.ORDER) {
                        roomOrder.setNumberRoom(roomOrder.getNumberRoom() + numberRoom);
                    } else {
                        roomOrder.setNumberRoom(numberRoom);

                    }
                    try {
                        roomOrderRepository.save(roomOrder);
                        paymentService.addPayment(roomOrder.getOrderId(), touristId, agentId, paymentStatus, accountNumber);
                        return true;
                    } catch (Exception e) {
                        return false;
                    }
                } else {
                    return saveOrderRoom(touristId, agentId, roomId, numberRoom, fromDate, toDate, paymentStatus, accountNumber, isPaid);
                }
            }
        }
        return false;
    }

    private boolean saveOrderRoom(int touristId, int agentId, int roomId, int numberRoom, Date fromDate, Date toDate,
                                  PaymentStatus paymentStatus, String accountNumber, int isPaid) {
        RoomOrder roomOrder = new RoomOrder(roomId, touristId, new Date(), OrderStatus.ORDER, numberRoom, fromDate, toDate);
        try {
            roomOrder.setIsPaid(isPaid);
            roomOrderRepository.save(roomOrder);
            paymentService.addPayment(roomOrder.getOrderId(), touristId, agentId, paymentStatus, accountNumber);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean cancelRoomId(int orderId) {
        Optional<RoomOrder> optionalRoomOrder = roomOrderRepository.findById(orderId);
        if (optionalRoomOrder.isPresent()) {
            RoomOrder roomOrder = optionalRoomOrder.get();

                roomOrder.setOrderStatus(OrderStatus.CANCEL);
                try {
                    roomOrderRepository.save(roomOrder);
                    paymentService.cancelPayment(roomOrder.getOrderId());
                    return true;
                } catch (Exception e) {
                    e.printStackTrace();
                    return false;
                }

        } else {
            return false;
        }
    }

    public boolean finishOrder(int orderId, int agentId) {
        Optional<RoomOrder> optionalRoomOrder = roomOrderRepository.findById(orderId);
        if (optionalRoomOrder.isPresent()) {
            RoomOrder roomOrder = optionalRoomOrder.get();
            Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
            if (optionalRoom.isPresent() && optionalRoom.get().getAgentId() == agentId) {
                roomOrder.setOrderStatus(OrderStatus.FINISH);
                try {
                    roomOrderRepository.save(roomOrder);
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

    public List<String> getAllRoom() {
        Optional<List<String>> optionalRoom = roomRepository.findAllRoom();
        if (optionalRoom.isPresent()) {
            return optionalRoom.get();
        } else {
            return new ArrayList<>();
        }

    }

    public List<RoomOrderInfo> getRoomOrderInfoOfTourist(int touristId, OrderStatus orderStatus) throws Exception {
        Optional<List<RoomOrder>> optionalRoomOrders = roomOrderRepository.findByTouristIdAndOrderStatus(touristId, orderStatus);
        Optional<Tourist> optionalTourist = touristRepository.findById(touristId);
        Tourist tourist;
        if (optionalTourist.isPresent()) {
            tourist = optionalTourist.get();
        } else {
            throw new Exception("Not found tourist");
        }
        List<RoomOrderInfo> roomOrderInfos = new ArrayList<>();
        if (optionalRoomOrders.isPresent()) {
            List<RoomOrder> roomOrders = optionalRoomOrders.get();
            for (RoomOrder roomOrder : roomOrders) {
                Payment payment = paymentService.getPaymentByOrderId(roomOrder.getOrderId());
                Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
                Room room;
                Agent agent;
                if (optionalRoom.isPresent()) {
                    room = optionalRoom.get();
                    Optional<Agent> optionalAgent = agentRepository.findById(room.getAgentId());
                    if (optionalAgent.isPresent()) {
                        agent = optionalAgent.get();
                    } else {
                        throw new Exception("Not found agent");
                    }
                } else {
                    throw new Exception("Not found room");
                }
                RoomOrderInfo roomOrderInfo = new RoomOrderInfo(roomOrder.getOrderId(), roomOrder.getRoomId(), room.getAgentId(),
                        touristId, tourist.getName(), tourist.getPhone(), roomOrder.getNumberRoom(),
                        agent.getName(), roomOrder.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                        roomOrder.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                        roomOrder.getOrderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), room.getRoomName(),
                        roomOrder.getOrderStatus(), room.getPrice() * roomOrder.getNumberRoom(),
                        payment.getPaymentStatus(), payment.getAccountNumber(), roomOrder.getIsPaid());
                roomOrderInfos.add(roomOrderInfo);
            }
            return roomOrderInfos;
        } else {
            return new ArrayList<>();
        }
    }

    public List<RoomOrderInfo> getRoomOrderInfoOfHotel(int hotelId, OrderStatus orderStatus) throws Exception {
        Optional<List<Room>> optionalRooms = roomRepository.findByAgentId(hotelId);
        List<Room> roomList = new ArrayList<>();
        if (optionalRooms.isPresent()) {
            roomList = optionalRooms.get();
        }
        List<RoomOrder> roomOrders = new ArrayList<>();
        for (Room value : roomList) {
            Optional<List<RoomOrder>> optionalRoomOrders =
                    roomOrderRepository.findByRoomIdAndOrderStatus(value.getRoomId(), orderStatus);
            if (optionalRoomOrders.isPresent()) {
                roomOrders.addAll(optionalRoomOrders.get());
            }
        }
        List<RoomOrderInfo> roomOrderInfos = new ArrayList<>();
        for (RoomOrder roomOrder : roomOrders) {
            Optional<Tourist> optionalTourist = touristRepository.findById(roomOrder.getTouristId());
            Tourist tourist;
            if (optionalTourist.isPresent()) {
                tourist = optionalTourist.get();
            } else {
                throw new Exception("Not found tourist");
            }
            Payment payment = paymentService.getPaymentByOrderId(roomOrder.getOrderId());
            Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
            Room room;
            Agent agent;
            if (optionalRoom.isPresent()) {
                room = optionalRoom.get();
                Optional<Agent> optionalAgent = agentRepository.findById(room.getAgentId());
                if (optionalAgent.isPresent()) {
                    agent = optionalAgent.get();
                } else {
                    throw new Exception("Not found agent");
                }
            } else {
                throw new Exception("Not found room");
            }
            RoomOrderInfo roomOrderInfo = new RoomOrderInfo(roomOrder.getOrderId(), roomOrder.getRoomId(), room.getAgentId(),
                    roomOrder.getTouristId(), tourist.getName(), tourist.getPhone(), roomOrder.getNumberRoom(),
                    agent.getName(), roomOrder.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                    roomOrder.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                    roomOrder.getOrderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), room.getRoomName(),
                    roomOrder.getOrderStatus(), room.getPrice() * roomOrder.getNumberRoom(),
                    payment.getPaymentStatus(), payment.getAccountNumber(), roomOrder.getIsPaid());
            roomOrderInfos.add(roomOrderInfo);
        }
        return roomOrderInfos;
    }

    public List<RoomOrderInfo> getAllOrderInfo() throws Exception {
        List<RoomOrder> roomOrders = (List<RoomOrder>) roomOrderRepository.findAll();
        List<RoomOrderInfo> roomOrderInfos = new ArrayList<>();
        for (RoomOrder roomOrder : roomOrders) {
            Optional<Tourist> optionalTourist = touristRepository.findById(roomOrder.getTouristId());
            Tourist tourist;
            if (optionalTourist.isPresent()) {
                tourist = optionalTourist.get();
            } else {
                throw new Exception("Not found tourist");
            }
            Payment payment = paymentService.getPaymentByOrderId(roomOrder.getOrderId());
            Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
            Room room;
            Agent agent;
            if (optionalRoom.isPresent()) {
                room = optionalRoom.get();
                Optional<Agent> optionalAgent = agentRepository.findById(room.getAgentId());
                if (optionalAgent.isPresent()) {
                    agent = optionalAgent.get();
                } else {
                    throw new Exception("Not found agent");
                }
            } else {
                throw new Exception("Not found room");
            }
            RoomOrderInfo roomOrderInfo = new RoomOrderInfo(roomOrder.getOrderId(), roomOrder.getRoomId(), room.getAgentId(),
                    roomOrder.getTouristId(), tourist.getName(), tourist.getPhone(), roomOrder.getNumberRoom(),
                    agent.getName(), roomOrder.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                    roomOrder.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                    roomOrder.getOrderDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(), room.getRoomName(),
                    roomOrder.getOrderStatus(), room.getPrice() * roomOrder.getNumberRoom(),
                    payment.getPaymentStatus(), payment.getAccountNumber(), roomOrder.getIsPaid());
            roomOrderInfos.add(roomOrderInfo);
        }
        return roomOrderInfos;
    }

    public boolean addRating(int orderId, int touristId, int hotelId, int rating, String comment) {
        Optional<Rating> optionalRating = ratingRepository.findByOrderId(orderId);
        if (optionalRating.isPresent()) {
            Rating oldRating = optionalRating.get();
            oldRating.setRating(rating);
            oldRating.setComment(comment);
            try {
                ratingRepository.save(oldRating);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            Rating newRating = new Rating(orderId, touristId, hotelId, comment, rating);
            try {
                ratingRepository.save(newRating);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
    }

    public List<Comment> allRateOfHotel(int hotelId) {
        Optional<List<Rating>> optionalRatings = ratingRepository.findByHotelId(hotelId);
        if (optionalRatings.isPresent()) {
            List<Rating> ratings = optionalRatings.get();
            List<Comment> comments = new ArrayList<>();
            for (Rating r: ratings) {
                Optional<Tourist> optionalTourist = touristRepository.findById(r.getTouristId());
                Optional<RoomOrder> optionalRoomOrder = roomOrderRepository.findById(r.getOrderId());
                Tourist tourist;
                RoomOrder roomOrder;
                Room room;
                if (optionalRoomOrder.isPresent() && optionalTourist.isPresent()) {
                    roomOrder = optionalRoomOrder.get();
                    tourist = optionalTourist.get();

                    Optional<Room> optionalRoom = roomRepository.findById(roomOrder.getRoomId());
                    if (optionalRoom.isPresent()) {
                        room = optionalRoom.get();
                    } else {
                        return new ArrayList<>();
                    }
                } else {
                    return new ArrayList<>();
                }
                Optional<Reply> reply = replyRepository.findByRatingId(r.getRatingId());
                if (reply.isPresent()) {
                    List<Reply> replies = new ArrayList<Reply>() {{
                        add(reply.get());
                    }};
                    Comment comment = new Comment(r.getRatingId(), roomOrder.getOrderId(), tourist.getTouristId(), tourist.getName(),
                            tourist.getImage().getUrl(), room.getRoomName(),
                            roomOrder.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                            roomOrder.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                            r.getComment(), r.getRating(), replies);
                    comments.add(comment);
                } else {
                    Comment comment = new Comment(r.getRatingId(), roomOrder.getOrderId(), tourist.getTouristId(), tourist.getName(),
                            tourist.getImage().getUrl(), room.getRoomName(),
                            roomOrder.getFromDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                            roomOrder.getToDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
                            r.getComment(), r.getRating(), new ArrayList<>());
                    comments.add(comment);
                }

            }
            return comments;
        } else {
            return new ArrayList<>();
        }
    }

    public RatingInfo ratingInfo(int hotelId) {
        Optional<List<Rating>> optionalRatings = ratingRepository.findByHotelId(hotelId);
        List<Rating> ratings = new ArrayList<>();
        if (optionalRatings.isPresent()) {
            ratings = optionalRatings.get();
        }
        RatingInfo ratingInfo = new RatingInfo(0,0);
        for(Rating r: ratings) {
            ratingInfo.setNumberRate(ratingInfo.getNumberRate() + 1);
            ratingInfo.setRating(ratingInfo.getRating() + r.getRating());
        }
        ratingInfo.setRating(ratingInfo.getRating() / ratingInfo.getNumberRate());
        return ratingInfo;
    }

    public List<Services> getAllServices() {
        return (List<Services>) serviceRepository.findAll();
    }


    public List<Reply> getAllReplyOfHotel(int hotelId) {
        Optional<List<Reply>> optionalReplies = replyRepository.findByHotelId(hotelId);
        if (optionalReplies.isPresent()) {
            return optionalReplies.get();
        } else {
            return new ArrayList<>();
        }
    }

    public List<Reply> getReplyOfRating(int ratingId) {
        Optional<Reply> optionalReplies = replyRepository.findByRatingId(ratingId);
        if (optionalReplies.isPresent()) {
            List<Reply> replies = new ArrayList<Reply>() {{
                add(optionalReplies.get());
            }};
            return replies;
        } else {
            return new ArrayList<>();
        }
    }

    public boolean addReply(ReplyInfo replyInfo) {
        Optional<Reply> optionalReply = replyRepository.findByRatingId(replyInfo.getRatingId());
        if (optionalReply.isPresent()) {
            Reply oldReply = optionalReply.get();
            oldReply.setReply(replyInfo.getReply());
            try {
                replyRepository.save(oldReply);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        } else {
            Agent agent = agentRepository.findByAgentId(replyInfo.getHotelId()).get();
            Reply reply = new Reply();
            reply.setHotelName(agent.getName());
            reply.setReply(replyInfo.getReply());
            reply.setRatingId(replyInfo.getRatingId());
            reply.setHotelId(replyInfo.getHotelId());

            try {
                replyRepository.save(reply);
                return true;
            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
    }

    public boolean paidOrder(int orderId) {
        RoomOrder roomOrder = roomOrderRepository.findById(orderId).get();
        try {
            roomOrder.setIsPaid(1);
            roomOrderRepository.save(roomOrder);
            return true;
        } catch (Exception e) {
            return false;
        }
    }



}
