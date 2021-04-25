import React, { useState, useEffect } from "react";
import Room from "../component/Room";

const ListRoom = ({ id, fromDate, toDate, adult, children, minPrice, maxPrice }) => {
  const [rooms, setRooms] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    fetch(
      api + "hotel/room/" +
        id +
        "?fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&adult=" +
        adult +
        "&children=" +
        children +
        "&minPrice=" +
        minPrice +
        "&maxPrice=" +
        maxPrice
    )
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
        
      });
  }, [id, fromDate, toDate, adult, children, minPrice, maxPrice]);

  return (
    <section class="our-rooms-area ">
      <div class="container">
        <div class="section-title">
          <span>Room</span>
          <h2>Room available</h2>
        </div>
        <div class="row">
          {rooms.map((item) => {
            return (
              <Room
                key={item.roomId}
                hotelId={id}
                room={item}
                fromDate={fromDate}
                toDate={toDate}
                adult={adult}
                children={children}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ListRoom;
