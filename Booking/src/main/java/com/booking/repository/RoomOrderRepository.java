package com.booking.repository;

import com.booking.model.OrderStatus;
import com.booking.model.hotel.RoomOrder;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface RoomOrderRepository extends CrudRepository<RoomOrder, Integer> {
    @Query(value = "Select * from room_order where room_id = :roomId  " +
            "and ((from_date between :fromDate and :toDate) or (to_date between :fromDate and :toDate))", nativeQuery = true)
    Optional<List<RoomOrder>> findRoomOrdered(int roomId, Date fromDate, Date toDate);

    @Query(value = "select * from room_order where room_id = :roomId and order_status = :orderStatus and tourist_id = :touristId and " +
            "(from_date between :fromDate and :toDate) and (to_date between :fromDate and :toDate)", nativeQuery = true)
    Optional<RoomOrder> findPersonalOrdered(int touristId, int roomId, OrderStatus orderStatus, Date fromDate, Date toDate);

    Optional<List<RoomOrder>> findByTouristIdAndOrderStatus(int touristId, OrderStatus orderStatus);

    Optional<List<RoomOrder>> findByRoomIdAndOrderStatus(int roomId, OrderStatus orderStatus);

    Optional<List<RoomOrder>> findByRoomId(int roomId);

    @Query(value = "delete from room_order where room_id = :roomId", nativeQuery = true)
    int deleteByRoom(int roomId);




}
