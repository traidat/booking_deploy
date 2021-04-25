import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const OrderList = ({ orderStatus, setOrderStatus, orderBy, sortBy }) => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "personal/hotel?status=" + orderStatus;
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
  }, [orderStatus]);
  
  const cancelOrder = (event) => {
    var token = localStorage.getItem("token");
    var url = api + "hotel/cancel?id=" + event.currentTarget.value;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toastFunc("success", "Cancel success");
        setOrderStatus("cancel");
      });
  };
  orders.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
  switch (sortBy) {
    case "Ascending":
      {
        switch (orderBy) {
          case "hotel":
            orders.sort((a, b) => a.hotelName.localeCompare(b.hotelName));
            break;
          case "room":
            orders.sort((a, b) => a.roomName.localeCompare(b.roomName));
            break;
          case "number":
            orders.sort((a, b) => a.numberRoom - b.numberRoom);
            break;
          case "price":
            orders.sort((a, b) => a.totalPrice - b.totalPrice);
            break;
          case "order":
            orders.sort(
              (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
            );
            break;
          case "from":
            orders.sort((a, b) => new Date(a.fromDate) - new Date(b.fromDate));
            break;
          case "to":
            orders.sort((a, b) => new Date(a.toDate) - new Date(b.toDate));
            break;
        }
      }
      break;
    case "Descending":
      {
        switch (orderBy) {
          case "hotel":
            orders.sort((a, b) => b.hotelName.localeCompare(a.hotelName));
            break;
          case "room":
            orders.sort((a, b) => b.roomName.localeCompare(a.roomName));
            break;
          case "number":
            orders.sort((a, b) => b.numberRoom - a.numberRoom);
            break;
          case "price":
            orders.sort((a, b) => b.totalPrice - a.totalPrice);
            break;
          case "order":
            orders.sort(
              (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
            );
            break;
          case "from":
            orders.sort((a, b) => new Date(b.fromDate) - new Date(a.fromDate));
            break;
          case "to":
            orders.sort((a, b) => new Date(b.toDate) - new Date(a.toDate));
            break;
        }
      }
      break;
  }

  if (orderStatus.toString().toLowerCase() === "order") {
    return (
      <body>
        <ToastNotify/>
        <section class="checkout-area ptb-40">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Hotel name</th>
                      <th>Room name</th>
                      <th>Number room</th>
                      <th>Total price</th>
                      <th>Order date</th>
                      <th>From date</th>
                      <th>To date</th>
                      <th>Order status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  {orders.map((item) => {
                    return (
                      <tbody>
                        <td>{item.orderId}</td>
                        <td>{item.hotelName}</td>
                        <td>{item.roomName}</td>
                        <td>{item.numberRoom}</td>
                        <td>{item.totalPrice}$</td>
                        <td>{item.orderDate}</td>
                        <td>{item.fromDate}</td>
                        <td>{item.toDate}</td>
                        <td>{item.orderStatus}</td>
                        <td>{item.isPaid == 1 ? <p>Paid</p> : <p>Not paid</p>}</td>
                        <td>
                          <button
                            class="default-btn btn-cancel"
                            value={item.orderId}
                            onClick={cancelOrder}
                          >
                            Cancel
                          </button>
                        </td>
                        
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
  } else if (orderStatus.toString().toLowerCase() === "finish") {
    return (
      <body>
        <ToastNotify/>
        <section class="checkout-area ptb-40">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Hotel name</th>
                      <th>Room name</th>
                      <th>Number room</th>
                      <th>Total price</th>
                      <th>Order date</th>
                      <th>From date</th>
                      <th>To date</th>
                      <th>Order status</th>
                      <th></th>
                    </tr>
                  </thead>
                  {orders.map((item) => {
                    return (
                      <tbody>
                        <td>{item.orderId}</td>
                        <td>{item.hotelName}</td>
                        <td>{item.roomName}</td>
                        <td>{item.numberRoom}</td>
                        <td>{item.totalPrice}$</td>
                        <td>{item.orderDate}</td>
                        <td>{item.fromDate}</td>
                        <td>{item.toDate}</td>
                        <td>{item.orderStatus}</td>
                        <td>
                          <button
                            class="default-btn btn-cancel"
                            value={item.orderId}
                            onClick={(e) => {
                              history.push({
                                pathname: "/comment",
                                search:
                                  "?id=" +
                                  item.agentId +
                                  "&fromDate=" +
                                  moment(item.fromDate).format("YYYY-MM-DD") +
                                  "&toDate=" +
                                  moment(item.toDate).format("YYYY-MM-DD") +
                                  "&name=" +
                                  item.hotelName +
                                  "&order=" +
                                  item.orderId,
                              });
                            }}
                          >
                            Comment
                          </button>
                        </td>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
  } else {
    return (
      <body>
        <ToastNotify/>
        <section class="checkout-area ptb-40">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Hotel name</th>
                      <th>Room name</th>
                      <th>Number room</th>
                      <th>Total price</th>
                      <th>Order date</th>
                      <th>From date</th>
                      <th>To date</th>
                      <th>Order status</th>
                    </tr>
                  </thead>
                  {orders.map((item) => {
                    return (
                      <tbody>
                        <td>{item.orderId}</td>
                        <td>{item.hotelName}</td>
                        <td>{item.roomName}</td>
                        <td>{item.numberRoom}</td>
                        <td>{item.totalPrice}$</td>
                        <td>{item.orderDate}</td>
                        <td>{item.fromDate}</td>
                        <td>{item.toDate}</td>
                        <td>{item.orderStatus}</td>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </section>
      </body>
    );
  }
};

export default OrderList;
