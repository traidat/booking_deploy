import React, { useState, useEffect } from "react";
import RoomComment from "./RoomComment";

const ListRoomComment = ({ id }) => {
  const [rooms, setRooms] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;


  useEffect(() => {
    fetch(api + "hotel_agent/room/" + id)
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
       
      });
  }, [id]);

  return (
    <section class="our-rooms-area pt-100">
      <div class="container">
        <div class="section-title">
          <h2>List Room</h2>
        </div>
        <div class="row">
          {rooms.map((item) => {
            return <RoomComment key={item.roomId} hotelId={id} room={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ListRoomComment;
