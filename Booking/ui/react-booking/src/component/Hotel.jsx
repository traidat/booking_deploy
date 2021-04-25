import React, { useState, useEffect } from "react";
import defaultImg from "../assets/images/room-1.jpeg";
import moment from "moment";
import { useHistory } from "react-router-dom";

const Hotel = ({
  hotel,
  fromDate,
  toDate,
  adult,
  children,
  minPrice,
  maxPrice,
}) => {
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
                      pathname: "/hotel/room",
                      search:
                        "?id=" +
                        hotel.agentId +
                        "&fromDate=" +
                        moment(fromDate).format("YYYY-MM-DD") +
                        "&toDate=" +
                        moment(toDate).format("YYYY-MM-DD") +
                        "&name=" +
                        hotel.name +
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
        // <article className="hotel">
        //     <div className="img-container">
        //         <img src={defaultImg} onClick={() => {
        // history.push({
        //     pathname: '/hotel',
        //     search: '?id=' + hotel.agentId + '&fromDate=' + moment(fromDate).format('YYYY-MM-DD') + '&toDate='
        //     + moment(toDate).format('YYYY-MM-DD') + "&name=" + hotel.name
        // })
        //         }}/>
        //         <p className="room-info">{hotel.name}</p>
        //      </div>
        // </article>

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
                      pathname: "/hotel/room",
                      search:
                        "?id=" +
                        hotel.agentId +
                        "&fromDate=" +
                        moment(fromDate).format("YYYY-MM-DD") +
                        "&toDate=" +
                        moment(toDate).format("YYYY-MM-DD") +
                        "&name=" +
                        hotel.name +
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

export default Hotel;
