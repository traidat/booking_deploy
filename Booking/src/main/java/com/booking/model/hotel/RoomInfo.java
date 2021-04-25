package com.booking.model.hotel;

import com.booking.model.Image;
import com.booking.model.Services;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Set;

@Data
public class RoomInfo {
    @NotNull
    private int numberRoom;

    private int roomId;

    private int hotelId;

    @NotNull
    private double price;

    @NotNull
    @Size(min = 3, max = 45)
    private String roomName;

    @NotNull
    private int adult;

    @NotNull
    private int children;

    private List<Integer> services;

    private List<Services> listService;

    private Set<String> url;

    private Set<Image> images;

    public RoomInfo(int roomId, double price, int adult, int children, String roomName, List<Services> listService, int numberRoom, Set<Image> images) {
        this.roomId = roomId;
        this.price = price;
        this.children = children;
        this.adult = adult;
        this.roomName = roomName;
        this.listService = listService;
        this.numberRoom = numberRoom;
        this.images = images;
    }
}
