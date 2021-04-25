import React, { useEffect, useState } from "react";
import Order from "./Order";

const RoomDetail = ({
  hotelId,
  roomId,
  fromDate,
  toDate,
  adult,
  children,
  tourist,
  minPrice, 
  maxPrice
}) => {
  const [rooms, setRooms] = useState([]);
  const [hotels, setHotels] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;


  useEffect(() => {
    fetch(
      api + "hotel/room/" +
        hotelId +
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

    var url = api + "hotel/" + hotelId;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      });
  }, []);

  return (
    <body>
      {rooms.map((item) => {
        if (item.roomId == roomId) {
          return (
            <div>
              <section class="service-details-area room-details-right-sidebar ptb-100">
                <div class="container">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="service-details-wrap service-right">
                        <div class="service-details-wrap">
                          {item.images.map((img) => {
                            return (
                              <div class="single-services-imgs">
                                <img
                                  src={img.url}
                                  alt="Image"
                                  key={img.imageId}
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="service-sidebar-area">
                        <div class="service-list service-card">
                          <h3 class="service-details-title">Service</h3>
                          <ul>
                            {item.listService &&
                              item.listService.map((service) => {
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
                          <h3 class="service-details-title">Info</h3>
                          <ul>
                            <li>
                              Available: {item.numberRoom}{" "}
                              <i class="bx bx-bed"></i>
                            </li>
                            <li>
                              Price: ${item.price} per night{" "}
                              <i class="bx bx-dollar"></i>
                            </li>
                            <li>
                              Max: {item.adult} adult + {item.children} children{" "}
                              <i class="bx bxs-user-detail"></i>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {hotels.map((h) => {
                return (
                  <Order
                    hotel={h}
                    room={item}
                    fromDate={fromDate}
                    toDate={toDate}
                    adult={adult}
                    children={children}
                    tourist={tourist}
                  />
                );
              })}
              ;
            </div>
          );
        }
      })}
    </body>
  );
};

export default RoomDetail;
