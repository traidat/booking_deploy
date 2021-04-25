import React from "react";
import defaultImg from "../assets/images/room-4.jpeg";
import { useHistory } from "react-router-dom";

const RoomComment = ({ hotelId, room, fromDate, toDate }) => {
  const history = useHistory();

  return (
    <div class="col-lg-4 col-sm-6">
      <div class="single-rooms-three-wrap">
        <div class="single-rooms-three">
          {room.images ? (
            <img src={room.images[0].url} alt="Image" />
          ) : (
            <img src={defaultImg} alt="Image" />
          )}
          <div class="single-rooms-three-content">
            <h2>{room.roomName}</h2>
            <ul class="rating">
              <span>${room.price} per night </span>
              <span>(Available: {room.numberRoom})</span>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomComment;
