import React from "react";
import defaultImg from "../assets/images/room-4.jpeg";
import { Link, useHistory } from "react-router-dom";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const RoomAgent = ({ room }) => {
  const history = useHistory();
  const api = process.env.REACT_APP_API_DOMAIN;
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const deleteRoom = () => {
    const tokenAgent = localStorage.getItem("tokenAgent");
    if (window.confirm("Delete this room")) {
      fetch(api + "agent/room/" + room.roomId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenAgent,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          toastFunc("success", "Delete success");
          setTimeout(() => {
            history.push("/home");
          }, 3000);
        })
        .catch(function (error) {
          var message = "";
          error.response.data.map((err) => {
            message = err.message;
          });
          toastFunc("error", message);
        });
    }
  };

  {
    if (room.images.length > 0) {
      return (
        <div class="col-lg-4 col-sm-6">
          <ToastNotify />
          <div class="single-rooms-three-wrap">
            <div class="single-rooms-three">
              <img src={room.images[0].url} alt="Image" />

              <div class="single-rooms-three-content">
                <h2>{room.roomName}</h2>
                <ul class="rating">
                  <span>${room.price} per night </span>
                  <span>(Available: {room.numberRoom})</span>
                </ul>
                {!tokenAdmin ? (
                  <a
                    href="#"
                    class="default-btn"
                    onClick={() => {
                      history.push({
                        pathname: "/modify",
                        search: "?id=" + room.roomId,
                      });
                    }}
                  >
                    Modify
                    <i class="flaticon-right"></i>
                  </a>
                ) : null}
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
                      pathname: "/modify",
                      search: "?id=" + room.roomId,
                    });
                  }}
                >
                  Modify
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

export default RoomAgent;
