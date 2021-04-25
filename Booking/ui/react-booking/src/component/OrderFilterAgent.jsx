import React, { useState } from "react";
import OrderListAgent from "./OrderListAgent";

const OrderFilterAgent = ({ id, hotels }) => {
  const [orderStatus, setOrderStatus] = useState("order");
  const [orderBy, setOrderBy] = useState();
  const [sortBy, setSortBy] = useState("Ascending");

  const changeOrderStatus = (event) => {
    setOrderStatus(event.currentTarget.value);
  };

  return (
    <section className="filter-container">
      <div class="section-title">
        <br />
        <h2>History order</h2>
      </div>
      <div class="row align-items-center">
        <div class="col-lg-3 col-sm-3"></div>
        <div class="col-lg-2 col-sm-12">
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
        <div class="col-lg-2 col-sm-12">
          <div class="check-content">
            <p>Sort by</p>
            <select
              name="order"
              id="order"
              className="form-control"
              value={orderBy}
              onChange={(e) => setOrderBy(e.currentTarget.value)}
            >
              <option key="1" value="tourist">
                Tourist
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
        <div class="col-lg-2 col-sm-12">
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
      <OrderListAgent
        id={id}
        hotels={hotels}
        orderStatus={orderStatus}
        setOrderStatus={setOrderStatus}
        orderBy={orderBy}
        sortBy={sortBy}
      />
    </section>
  );
};

export default OrderFilterAgent;
