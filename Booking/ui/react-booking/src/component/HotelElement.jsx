import React, { useState, useEffect } from "react";
import defaultImg from "../assets/images/room-1.jpeg";
import { useHistory } from "react-router-dom";

const HotelElement = ({ hotel }) => {
  const history = useHistory();
  const [rating, setRating] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "hotel/rating/" + hotel.agentId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRating(data);
      });
  }, [hotel]);
  {
    if (hotel.images.length > 0) {
      return (
        <div class="col-lg-4 col-sm-6">
          <div class="single-rooms-three-wrap">
            <div class="single-rooms-three">
              <img src={hotel.images[0].url} alt="Image" />

              <div class="single-rooms-three-content">
                <h2>{hotel.name}</h2>
                <ul class="rating">
                  {rating.map((rate) => {
                    if (rate.numberRate > 0) {
                      return (
                        <li>
                          {rate.rating} <i class="bx bxs-star"></i>
                        </li>
                      );
                    } else {
                      return <li>No one rate</li>;
                    }
                  })}
                </ul>
                <span>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </span>
                <br />
                <a
                  href="#"
                  class="default-btn"
                  onClick={() => {
                    history.push({
                      pathname: "/agent/hotel",
                      search: "?id=" + hotel.agentId,
                    });
                  }}
                >
                  Details
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
                <h2>{hotel.name}</h2>
                <ul class="rating">
                  {rating.map((rate) => {
                    if (rate.numberRate > 0) {
                      return (
                        <li>
                          {rate.rating} <i class="bx bxs-star"></i>
                        </li>
                      );
                    } else {
                      return <li>No one rate</li>;
                    }
                  })}
                </ul>
                <span>
                  {hotel.address}, {hotel.city}, {hotel.country}
                </span>
                <br />
                <a
                  href="#"
                  class="default-btn"
                  onClick={() => {
                    history.push({
                      pathname: "/agent/hotel",
                      search: "?id=" + hotel.agentId,
                    });
                  }}
                >
                  Details
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

export default HotelElement;
