import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RoomAgent from "../component/RoomAgent";

const ListRoomAgent = ({ id }) => {
  const history = useHistory();
  const [rooms, setRooms] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const tokenAgent = localStorage.getItem("tokenAgent");
  useEffect(() => {
    fetch(api + "hotel_agent/room/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRooms(data);
      });
  }, [id]);

  const addRoom = () => {
    history.push("/add?id=" + id);
  };

  return (
    <section class="our-rooms-area">
      <div class="container">
        <div class="section-title">
          <span>Room</span>
          <h2>Room available</h2>
          {!tokenAdmin ? (
            <button className="btn btn-primary btn-block" onClick={addRoom}>
              Add room
            </button>
          ) : null}
        </div>
        <div class="row">
          {rooms.map((item) => {
            return <RoomAgent key={item.roomId} hotelId={id} room={item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ListRoomAgent;
