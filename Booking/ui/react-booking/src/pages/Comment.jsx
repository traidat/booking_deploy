import React from "react";
import { useLocation } from "react-router-dom";
import CommentInput from "../component/CommentInput";
import HotelComment from "../component/HotelComment";

const Comment = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const name = params.get("name");
  const order = params.get("order");

  return (
    <body>
      <div class="page-title-area">
        <div class="container">
          <div class="page-title-content">
            <h2>{name}</h2>
          </div>
        </div>
      </div>
      <HotelComment key={id} id={id} />
      <CommentInput hotel={id} order={order} />
    </body>
  );
};

export default Comment;
