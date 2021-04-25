import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import OrderFilter from "../component/OrderFilter";
import OrderFilterAdmin from "../component/OrderFilterAdmin";

const TouristAdmin = () => {
  const location = useLocation();
  const api = process.env.REACT_APP_API_DOMAIN;
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [tourist, setTourist] = useState([]);
  const tokenAgent = localStorage.getItem("tokenAgent");
  useEffect(() => {
    var url = api + "admin/tourist?id=" + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTourist(data);
      });
  }, []);
  return (
    <body>
      {tourist.map((item) => {
        return (
          <section class="checkout-area ptb-40">
            <div class="container">
              <div class="row">
                <div class="billing-details">
                  <h3 class="title">Tourist detail</h3>
                  <div class="row">
                    <div class="col-lg-2 col-md-6">
                      <div class="form-group">
                        <label>
                          Name <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={item.name}
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="form-group">
                        <label>
                          Phone <span class="required">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          value={item.phone}
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="form-group">
                        <label>
                          Email Address <span class="required">*</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          value={item.email}
                          readOnly
                        />
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                      <div class="form-group">
                        <label>
                          Age<span class="required">*</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          value={item.age}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br/>
              <OrderFilterAdmin id={id} name={item.name}/>
            </div>
          </section>
        );
      })}
    </body>
  );
};

export default TouristAdmin;
