import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RoomDetail from "../component/RoomDetail";


const RoomOrder = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roomId = params.get("id");
  const fromDate = params.get("fromDate");
  const toDate = params.get("toDate");
  const hotelId = params.get("hotel");
  const name = params.get("name");
  const adult = params.get("adult"); 
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const [tourist, setTourist] = useState([]);
  const children = params.get("children");
  const api = process.env.REACT_APP_API_DOMAIN;


  useEffect(() => {
    var url = api + "personal";
    const token = localStorage.getItem("token");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTourist(data);
      });
  },[]);

  return (
    <body>
      <div class="page-title-area">
        <div class="container">
          <div class="page-title-content">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      {tourist.map((item) => {
        return (
          <RoomDetail
            hotelId={hotelId}
            roomId={roomId}
            fromDate={fromDate}
            toDate={toDate}
            name={name}
            adult={adult}
            children={children}
            tourist={item}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        );
      })}
    </body>
  );
};

export default RoomOrder;
