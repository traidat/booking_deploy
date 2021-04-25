import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HotelListAgent from "../component/HotelListAgent";

const AgentAdmin = () => {
    const location = useLocation();
    const api = process.env.REACT_APP_API_DOMAIN;
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const [hotels, setHotels] = useState([]);
    const tokenAgent = localStorage.getItem("tokenAgent");

    useEffect(() => {
        var url = api + "admin/personal_agent/" + id;
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
        <section class="our-rooms-area ptb-100">
          <div class="container">
            <div class="section-title">
            </div>
            <HotelListAgent hotels={hotels} />
          </div>
        </section>
      );

}

export default AgentAdmin;