import React, { useEffect, useState } from "react";
import moment from "moment";
import Hotel from "./Hotel";

const HotelList = ({ country, city, fromDate, toDate, adult, children, minPrice, maxPrice }) => {
  const [hotels, setHotels] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  country.replaceAll(" ", "+");
  city.replaceAll(" ", "+");
  useEffect(() => {
    var url =
      api + "hotel?fromDate=" +
      moment(fromDate).format("YYYY-MM-DD") +
      "&toDate=" +
      moment(toDate).format("YYYY-MM-DD") +
      "&country=" +
      country +
      "&city=" +
      city +
      "&adult=" +
      adult +
      "&children=" +
      children + 
      "&minPrice=" + 
      minPrice + 
      "&maxPrice=" + 
      maxPrice 
    
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      });
  }, [country, city, fromDate, toDate, adult, children, minPrice, maxPrice]);

  if (hotels.length === 0) {
    return (
      <section class="our-rooms-area ptb-100">
        <div class="container">
          <div class="section-title">
            <span>Hotel</span>
            <h3>Unfortunately no hotels matched your search parameters</h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    // <section className="roomslist">
    //     <div className="roomslist-center">
    //         {hotels.map(item => {
    //             return <Hotel key={item.agentId} hotel={item} fromDate={fromDate} toDate={toDate} />
    //         }) }
    //     </div>
    // </section>
    <section class="our-rooms-area ptb-100">
      <div class="container">
        <div class="section-title">
          <span>Hotel</span>
          <h2>Hotel available</h2>
        </div>
        <div class="row">
          {hotels.map((item) => {
            return (
              <Hotel
                key={item.agentId}
                hotel={item}
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
export default HotelList;
