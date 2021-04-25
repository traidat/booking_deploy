import React, { useEffect, useState } from "react";
import defaultImg from "../assets/images/avatar.png";
import StarRatings from "react-star-ratings";
import CommentReply from "./CommentReply";
import Reply from "../component/Reply";

const CommentListAgent = ({ id, hotel }) => {
  const [comment, setComment] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;
  const [activeRep, setActiveRep] = useState();
  const [replies, setReplies] = useState([]);
  const tokenAgent = localStorage.getItem("tokenAgent");
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  useEffect(() => {
    var url = api + "hotel/all_rate/" + id;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setComment(data);
      });
  }, []);

  function handleReply(item, index) {
    if (activeRep == index) {
      setActiveRep();
    } else {
      setActiveRep(index);
    }
  }

  return (
    <section class="testimonials-area testimonials-area-inner pt-100 pb-70">
      <div class="container">
        <div class="section-title">
          <span>Rating</span>
          <h2>Comment</h2>
        </div>
        <div class="row">
          {comment.map((item, index) => {
            return (
              <div class="row" style={{ marginBottom: "2%" }}>
                <div class="col-lg-12 col-sm-12">
                  <div class="row">
                    <div class="col-lg-1 col-sm-2">
                      <img
                        src={item.image}
                        style={{ width: "50px", height: "50px" }}
                      ></img>
                    </div>
                    <div class="col-lg-11 col-sm-10 comment">
                      <div class="row">
                        <p>
                          <b>{item.name}</b>
                        </p>
                        <StarRatings
                          number={5}
                          starDimension={20}
                          rating={item.rating}
                          starRatedColor="red"
                        />
                      </div>

                      <span>
                        <b>Room: </b>
                        {item.roomName} : ({item.fromDate} - {item.toDate})
                      </span>
                      <p>{item.comment}</p>
                    </div>
                    <div>
                      {!tokenAdmin ? (
                        <div class="row" style={{ marginTop: "3%" }}>
                          <div class="col-lg-1 col-sm-2"> </div>
                          <div class="col-lg-11 col-sm-2">
                            {item.reply.length > 0 ? (
                              <CommentReply
                                ratingId={item.ratingId}
                                hotelId={id}
                                replies={item.reply[0].reply}
                              />
                            ) : (
                              <CommentReply
                                ratingId={item.ratingId}
                                hotelId={id}
                              />
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CommentListAgent;
