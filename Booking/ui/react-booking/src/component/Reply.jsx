import React, { useEffect, useState } from "react";
import defaultImg from "../assets/images/avatar.png";

const Reply = ({ id, hotel }) => {
  const [replies, setReplies] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "reply/rating/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setReplies(data);
      });
  }, [id]);
  return (
    // <div class="row">
    //   <div class="col-lg-12 col-sm-12">
    //     <div class="row">
    //       <div class="col-lg-1 col-sm-2">
    //         <img
    //           src={defaultImg}
    //           style={{ width: "50px", height: "50px" }}
    //         ></img>
    //       </div>
    //       <div class="col-lg-11 col-sm-10 comment">
    //         <p>
    //           <b>{props.user}</b>
    //         </p>
    //         <div class="col-lg-12 col-sm-12">
    //           <input class="input-reply"></input>
    //         </div>
    //       </div>
    //       <div></div>
    //     </div>
    //   </div>
    // </div>

    <div class="row">
      <div class="col-lg-12 col-sm-12">
        {replies.map((item) => {
          if (item.ratingId == id) {
            return (
              <div class="row">
                <div class="col-lg-1 col-sm-2">
                  <img
                    src={hotel[0].images[0].url}
                    style={{ width: "50px", height: "50px" }}
                  ></img>
                </div>
                <div class="col-lg-11 col-sm-10 comment">
                  <p>
                    <b>{item.hotelName}</b>
                  </p>
                  <div class="col-lg-12 col-sm-12">
                    <p>{item.reply}</p>
                  </div>
                </div>
                <div></div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Reply;
