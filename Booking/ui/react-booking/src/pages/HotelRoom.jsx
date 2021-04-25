import React from "react";
import { useLocation } from "react-router-dom";
import HotelDetail from "../component/HotelDetail";
import CommentList from "../component/CommentList";
import ListRoom from "../component/ListRoom";

const HotelRoom = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const fromDate = params.get("fromDate");
  const toDate = params.get("toDate");
  const name = params.get("name");
  const adult = params.get("adult");
  const children = params.get("children");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");

  
  return (
    <body>
      <div class="page-title-area">
        <div class="container">
          <div class="page-title-content">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      <HotelDetail
        id={id}
        name={name}
        fromDate={fromDate}
        toDate={toDate}
        adult={adult}
        children={children}
      />
      <ListRoom
        id={id}
        fromDate={fromDate}
        toDate={toDate}
        adult={adult}
        children={children}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      <CommentList id={id} />
    </body>
  );
};
export default HotelRoom;
