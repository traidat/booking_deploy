import React, { useEffect, useState } from "react";
import HotelAgent from "../component/HotelAgent";
import ListRoomAgent from "../component/ListRoomAgent";
import CommentListAgent from "./CommentListAgent";
import { useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";

const HomeAgent = () => {
  const [hotels, setHotels] = useState([]);
  const [info, setInfo] = useState("detail");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hotelId = params.get("id");
  const tokenAgent = localStorage.getItem("tokenAgent");
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "hotel/" + hotelId;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      });
  }, []);
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <div class="row">
        <div class="col-4"></div>
        <div class="booking-col-2">
          <div class="single-booking" onClick={(e) => setInfo("detail")}>
            <i class="book-icon flaticon-online-booking"></i>
            <h3>Hotel Detail</h3>
          </div>
        </div>
        <div class="booking-col-2">
          <div class="single-booking" onClick={(e) => setInfo("dashboard")}>
            <i class="book-icon flaticon-appointment"></i>
            <h3>Dashboard</h3>
          </div>
        </div>
        {hotels.map((item) => {
          if (info == "detail") {
            return (
              <div>
                <HotelAgent id={item.agentId} hotels={hotels} />
                <ListRoomAgent id={item.agentId} />
                <CommentListAgent id={item.agentId} />
              </div>
            );
          } else {
            return (
              <div>
                <Dashboard id={item.agentId} hotels={hotels} />
              </div>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
};

export default HomeAgent;
