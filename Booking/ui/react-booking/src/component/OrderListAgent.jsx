import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const OrderListAgent = ({
  orderStatus,
  setOrderStatus,
  orderBy,
  sortBy,
  id,
  hotels,
}) => {
  const history = useHistory;
  const [orders, setOrders] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "agent/hotel?status=" + orderStatus + "&id=" + id;
    var tokenAgent = localStorage.getItem("tokenAgent");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [orderStatus]);

  const cancelOrder = (event) => {
    event.preventDefault();
    var url = api + "hotel/cancel?id=" + event.currentTarget.value;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toastFunc("success", "Cancel success");
        setOrderStatus("cancel");
      });
  };

  const paidOrder = (event) => {
    event.preventDefault();
    var url = api + "agent/paid/" + event.currentTarget.value;
    console.log(url)
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toastFunc("success", "Paid success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  switch (sortBy) {
    case "Ascending":
      {
        switch (orderBy) {
          case "hotel":
            orders.sort((a, b) => a.touristName.localeCompare(b.touristName));
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
            orders.sort((a, b) => b.touristName.localeCompare(a.touristName));
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
        <section class="checkout-area">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Tourist name</th>
                      <th>Phone</th>
                      <th>Room </th>
                      <th>Number of room</th>
                      <th>Total price</th>
                      <th>Order date</th>
                      <th>Arrival Date</th>
                      <th>Departure Date</th>
                      <th>Order status</th>
                      <th>Payment method</th>
                      <th>Credit card</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  {orders.map((item) => {
                    return (
                      <tbody>
                        <td>{item.orderId}</td>
                        <td>{item.touristName}</td>
                        <td>{item.touristPhone}</td>
                        <td>{item.roomName}</td>
                        <td>{item.numberRoom}</td>
                        <td>{item.totalPrice}$</td>
                        <td>{moment(item.orderDate).format("DD-MM-YYYY")}</td>
                        <td>{moment(item.fromDate).format("DD-MM-YYYY")}</td>
                        <td>{moment(item.toDate).format("DD-MM-YYYY")}</td>
                        <td>{item.orderStatus}</td>
                        <td>{item.paymentStatus}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.isPaid == 1 ? <p>Paid</p> : <button
                            class="default-btn btn-cancel"
                            value={item.orderId}
                            onClick={paidOrder}
                          >
                            Paid
                          </button>}</td>
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
  } else {
    return (
      <body>
        <section class="checkout-area">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Tourist name</th>
                      <th>Phone</th>
                      <th>Room </th>
                      <th>Number of room</th>
                      <th>Total price</th>
                      <th>Order date</th>
                      <th>Arrival Date</th>
                      <th>Departure Date</th>
                      <th>Order status</th>
                      <th>Payment method</th>
                      <th>Credit card</th>
                    </tr>
                  </thead>
                  {orders.map((item) => {
                    return (
                      <tbody>
                        <td>{item.orderId}</td>
                        <td>{item.touristName}</td>
                        <td>{item.touristPhone}</td>
                        <td>{item.roomName}</td>
                        <td>{item.numberRoom}</td>
                        <td>{item.totalPrice}$</td>
                        <td>{moment(item.orderDate).format("DD-MM-YYYY")}</td>
                        <td>{moment(item.fromDate).format("DD-MM-YYYY")}</td>
                        <td>{moment(item.toDate).format("DD-MM-YYYY")}</td>
                        <td>{item.orderStatus}</td>
                        <td>{item.paymentStatus}</td>
                        <td>{item.accountNumber}</td>
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

export default OrderListAgent;
