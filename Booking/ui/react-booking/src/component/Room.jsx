import React from "react";
import defaultImg from "../assets/images/room-4.jpeg";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Room = ({
  hotelId,
  room,
  fromDate,
  toDate,
  adult,
  children,
  minPrice,
  maxPrice,
}) => {
  const history = useHistory();

  {
    if (room.images.length > 0) {
      return (
        <div class="col-lg-4 col-sm-6">
          <div class="single-rooms-three-wrap">
            <div class="single-rooms-three">
              <img src={room.images[0].url} alt="Image" />

              <div class="single-rooms-three-content">
                <h2>{room.roomName}</h2>
                <ul class="rating">
                  <span>${room.price} per night </span>
                  <span>(Available: {room.numberRoom})</span>
                </ul>
                <a
                  href="#"
                  class="default-btn"
                  onClick={() => {
                    history.push({
                      pathname: "/room",
                      search:
                        "?id=" +
                        room.roomId +
                        "&fromDate=" +
                        moment(fromDate).format("YYYY-MM-DD") +
                        "&toDate=" +
                        moment(toDate).format("YYYY-MM-DD") +
                        "&name=" +
                        room.roomName +
                        "&hotel=" +
                        hotelId +
                        "&adult=" +
                        adult +
                        "&children=" +
                        children +
                        "&minPrice=" +
                        minPrice +
                        "&maxPrice=" +
                        maxPrice,
                    });
                  }}
                >
                  Order
                  <i class="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="col-lg-4 col-sm-6">
          <div class="single-rooms-three-wrap">
            <div class="single-rooms-three">
              <img src={defaultImg} alt="Image" />

              <div class="single-rooms-three-content">
                <h2>{room.roomName}</h2>
                <ul class="rating">
                  <span>${room.price} per night </span>
                  <span>(Available: {room.numberRoom})</span>
                </ul>
                <a
                  href="#"
                  class="default-btn"
                  onClick={() => {
                    history.push({
                      pathname: "/room",
                      search:
                        "?id=" +
                        room.roomId +
                        "&fromDate=" +
                        moment(fromDate).format("YYYY-MM-DD") +
                        "&toDate=" +
                        moment(toDate).format("YYYY-MM-DD") +
                        "&name=" +
                        room.roomName +
                        "&hotel=" +
                        hotelId +
                        "&adult=" +
                        adult +
                        "&children=" +
                        children +
                        "&minPrice=" +
                        minPrice +
                        "&maxPrice=" +
                        maxPrice,
                    });
                  }}
                >
                  Order
                  <i class="flaticon-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Room;
