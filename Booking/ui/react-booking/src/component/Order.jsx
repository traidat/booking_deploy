import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccountNumber from "./AccountNumber";
import YourOrder from "./YourOrder";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const Order = ({ hotel, room, fromDate, toDate, tourist, adult, children }) => {
  const [numberRoom, setNumberRoom] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [accountNumber, setAccountNumber] = useState();
  const api = process.env.REACT_APP_API_DOMAIN;


  const history = useHistory();


  const submit = (event) => {
    event.preventDefault();
    const data = {
      agentId: hotel.agentId,
      roomId: room.roomId,
      fromDate: fromDate,
      toDate: toDate,
      numberRoom: numberRoom,
      paymentStatus: paymentMethod,
      accountNumber: accountNumber,
      adult: adult,
      children: children,
    };
    const token = localStorage.getItem("token");
    axios
      .post(api + "hotel/order", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then(function (response) {
        toastFunc("success", "Order success")
        setTimeout(() => {
          history.push("/personal");
        }, 3000);
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
          toastFunc("error", message)
        });
      });
  };
  return (
    <section class="checkout-area ptb-40">
      <ToastNotify/>
      <div class="container">
        <form onSubmit={submit}>
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="billing-details">
                <h3 class="title">Order Details</h3>
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Name <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={tourist.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Phone <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={tourist.phone}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Email Address <span class="required">*</span>
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        value={tourist.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Hotel <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={hotel.name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Room <span class="required">*</span>
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        value={room.roomName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Number of room (Available: {room.numberRoom}){" "}
                        <span class="required">*</span>
                      </label>
                      <input
                        type="number"
                        class="form-control"
                        value={numberRoom}
                        onChange={(e) => {
                          setNumberRoom(e.currentTarget.value);
                        }}
                      />
                      
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label>
                        Payment method <span class="required">*</span>
                      </label>
                      <select
                        name="payment"
                        class="form-control"
                        placeholder="Enter password"
                        value={paymentMethod}
                        onChange={(e) =>
                          setPaymentMethod(e.currentTarget.value)
                        }
                      >
                        <option key="ONLINE" value="CREDIT_CARD">
                          Pay now by credit card
                        </option>
                        <option key="OFFLINE" value="CASH">
                          Pay later at the hotel
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <AccountNumber
                    paymentMethod={paymentMethod}
                    accountNumber={accountNumber}
                    setAccountNumber={setAccountNumber}
                  />
              </div>
            </div>
            <div class="col-lg-6 col-md-12">
              <div class="order-details">
                <YourOrder room={room} numberRoom={numberRoom} />
                <div class="payment-box">
                  <button type="submit" class="default-btn">
                    Order
                    <i class="flaticon-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Order;
