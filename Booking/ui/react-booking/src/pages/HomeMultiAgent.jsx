import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import HotelListAgent from "../component/HotelListAgent";

const HomeMultiAgent = () => {
  const api = process.env.REACT_APP_API_DOMAIN;
  const history = useHistory();
  const [hotels, setHotels] = useState([]);
  const [account, setAccount] = useState([]);
  const tokenAgent = localStorage.getItem("tokenAgent");
  useEffect(() => {
    var url = api + "personal_agent";
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
    var url1 = api + "account";
    fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAccount(data);
      });
  }, []);

  const addHotel = () => {
    account.map((item) => {
      history.push({
        pathname: "agent",
        search: "?id=" + item.id,
      });
    });
  };
  return (
    <section class="our-rooms-area ptb-100">
      <div class="container">
        <div class="section-title">
          <button className="btn btn-primary btn-block" onClick={addHotel}>
            Add new hotel
          </button>
        </div>
        <HotelListAgent hotels={hotels} />
      </div>
    </section>
  );
};

export default HomeMultiAgent;
