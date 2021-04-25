import React, { useState, useEffect } from "react";
import MyGoogleMap from "./MyGoogleMap";

const HotelDetail = ({ id, name, fromDate, toDate, adult, children }) => {
  const [hotels, setHotels] = useState([]);
  const [rating, setRating] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "hotel/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      });
  }, [id]);

  useEffect(() => {
    var url = api + "hotel/rating/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRating(data);
      });
  }, [id]);

  return (
    <section class="service-details-area room-details-right-sidebar ptb-100">
      {hotels.map((item) => {
        return (
          <div class="container">
            <div class="row">
              <div class="col-lg-8">
                <div class="service-details-wrap service-right">
                  <div class="service-details-wrap">
                    {item.images.map((img) => {
                      return (
                        <div class="single-services-imgs">
                          <img src={img.url} alt="Image" key={img.imageId} />
                        </div>
                      );
                    })}
                    <br />
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="service-sidebar-area">
                  <div class="service-list service-card">
                    <h3 class="service-details-title">Service</h3>
                    <ul>
                      {item.services &&
                        item.services.map((service) => {
                          return (
                            <li>
                              {service.serviceName}
                              <i class="bx bx-check"></i>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div class="service-list service-card">
                    <h3 class="service-details-title">Contact Info</h3>
                    <ul>
                      <li>
                        {item.phone}
                        <i class="bx bx-phone-call bx-rotate-270"></i>
                      </li>
                      <li>
                        <span
                          class="__cf_email__"
                          data-cfemail="5f373a3333301f3a3c302d3634713c3032"
                        >
                          {item.email}
                        </span>
                        <i class="bx bx-envelope"></i>
                      </li>
                      <li>
                        <span>
                          {item.address}, {item.city}, {item.country}
                        </span>
                        <i class="bx bx-location-plus"></i>
                      </li>
                    </ul>
                  </div>
                  <div class="service-list service-card">
                    <h3 class="service-details-title">Rating</h3>
                    <ul class="rating">
                      {rating.map((rate) => {
                        if (rate.numberRate > 0) {
                          return (
                            <li>
                              <span>
                                {rate.rating} over {rate.numberRate} rate
                                <i class="bx bxs-star"></i>
                              </span>
                            </li>
                          );
                        } else {
                          return (
                            <li>
                              <span>No one rate</span>
                              <i class="bx bxs-star"></i>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                  <div class="service-list service-card">
                    <div className="main-wrapper">
                      <MyGoogleMap
                        lat={item.lat}
                        lng={item.lng}
                        address={item.address}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HotelDetail;
