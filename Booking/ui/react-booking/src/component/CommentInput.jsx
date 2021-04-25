import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const CommentInput = ({ hotel, order }) => {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "personal/hotel?status=FINISH";
    var token = localStorage.getItem("token");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [order]);

  useEffect(() => {
    var url = api + "rating/" + order;
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        data.map((item) => {
          if (item) {
            setRating(item.rating);
            setComment(item.comment);
          }
        })
      );
  }, [order]);

  const submit = (e) => {
    e.preventDefault();
    var data = {
      comment,
      rating,
    };
    var token = localStorage.getItem("token");
    var url = api + "rating?hotel=" + hotel + "&order=" + order;
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        toastFunc("success", "Comment sucess");
        setTimeout(() => {
          history.push("/personal");
        }, 3000);
        
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
          toastFunc("error", message);
        });
      });
  };
  return (
    <section class="checkout-area">
      <ToastNotify/>
      <div class="container">
        <form onSubmit={submit}>
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="billing-details">
                <h3 class="title">Rate your experience</h3>
                <div class="row">
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label>
                        Comment <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter comment"
                        value={comment}
                        onChange={(e) => setComment(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label>
                        Rating <span class="required">*</span>
                      </label>
                      <StarRatings
                        number={5}
                        rating={rating}
                        starRatedColor="yellow"
                        changeRating={(e) => {
                          setRating(e);
                        }}
                      />
                    </div>
                  </div>
                  <div class="payment-box">
                    <button type="submit" class="default-btn">
                      Comment
                      <i class="flaticon-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6 col-md-12">
              <div class="billing-details">
                {orders.map((item) => {
                  if (item.orderId == order) {
                    return (
                      <div class="row">
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              Hotel <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={item.hotelName}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              Room <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={item.roomName}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              From date <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={item.fromDate}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              To date <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={item.toDate}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              Number of room <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={item.numberRoom}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6">
                          <div class="form-group">
                            <label>
                              Price <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              value={"$" + item.totalPrice}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CommentInput;
