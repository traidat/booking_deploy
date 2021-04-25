import React, { useState } from "react";
import OrderList from "./OrderList";
import OrderListAdmin from "./OrderListAdmin";

const OrderFilterAdmin = ({ id, name }) => {
  const [orderStatus, setOrderStatus] = useState("order");
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState("Ascending");

  const changeOrderStatus = (event) => {
    setOrderStatus(event.currentTarget.value);
  };

  return (
    <div class="container">
      <section className="filter-container">
        <div class="section-title">
          <h2>{name} order</h2>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-3"></div>
          <div class="col-lg-2 col-sm-4">
            <div class="check-content">
              <p>Order Type</p>
              <select
                name="order"
                id="order"
                className="form-control"
                value={orderStatus}
                onChange={changeOrderStatus}
              >
                <option key="ORDER" value="order">
                  ORDER
                </option>
                <option key="FINISH" value="finish">
                  FINISH
                </option>
                <option key="CANCEL" value="cancel">
                  CANCEL
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-2 col-sm-4">
            <div class="check-content">
              <p>Sort by</p>
              <select
                name="order"
                id="order"
                className="form-control"
                value={orderBy}
                onChange={(e) => setOrderBy(e.currentTarget.value)}
              >
                <option key="1" value="hotel">
                  Hotel
                </option>
                <option key="2" value="room">
                  Room
                </option>
                <option key="3" value="number">
                  Number room
                </option>
                <option key="4" value="price">
                  Price
                </option>
                <option key="5" value="order">
                  Order date
                </option>
                <option key="6" value="from">
                  From date
                </option>
                <option key="7" value="to">
                  To date
                </option>
              </select>
            </div>
          </div>
          <div class="col-lg-2 col-sm-4">
            <div class="check-content">
              <p>Sort</p>
              <select
                name="order"
                id="order"
                className="form-control"
                value={sortBy}
                onChange={(e) => setSortBy(e.currentTarget.value)}
              >
                <option key="Ascending" value="Ascending">
                  Ascending
                </option>
                <option key="Descending" value="Descending">
                  Descending
                </option>
              </select>
            </div>
          </div>
        </div>
        <br />
        <OrderListAdmin
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
          orderBy={orderBy}
          sortBy={sortBy}
          id={id}
        />
      </section>
    </div>
  );
};

export default OrderFilterAdmin;
