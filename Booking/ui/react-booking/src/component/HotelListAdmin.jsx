import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HotelElement from "./HotelElement";

const HotelListAdmin = ({ hotels }) => {
  const api = process.env.REACT_APP_API_DOMAIN;
  const history = useHistory();

  if (hotels.length === 0) {
    return (
      <div class="container">
        <div class="section-title">
          <span>Hotel</span>
          <h3>You not have any hotel</h3>
        </div>
      </div>
    );
  }
  
  return (
    <div class="container">
      <div class="section-title">
        <span>Hotel</span>
        <h2>Hotel available</h2>
      </div>
      <div class="row">
        {hotels.map((item) => {
          return <HotelElement key={item.agentId} hotel={item} />;
        })}
      </div>
    </div>
  );
};
export default HotelListAdmin;
