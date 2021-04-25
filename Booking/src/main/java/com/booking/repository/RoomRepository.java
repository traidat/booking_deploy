package com.booking.repository;

import com.booking.model.hotel.Room;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends CrudRepository<Room, Integer> {
    Optional<List<Room>> findByAgentId(int id);
    @Query(value = "select * from room where agent_id = ?1 and room_name = ?2 limit 1", nativeQuery = true)
    Optional<Room> findByAgentIdAndRoomName(int agentId, String name);

    @Modifying
    @Query(value = "update room set number_room = :numberRoom, room_name = :roomName, adult = :adult, children = :children, price = :price where room_id = :roomId", nativeQuery = true)
    int updateRoom(int numberRoom, String roomName, int adult, int children, double price, int roomId);

    @Query(value = "select dictinct room_name from room", nativeQuery = true)
    Optional<List<String>> findAllRoom();

}
