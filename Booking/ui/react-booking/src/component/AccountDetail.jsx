import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AccountFilter from "./AccountFilter";
import { toastFunc } from "../utils/common";
import ToastNotify from "../component/ToastNotify";
import axios from "axios";

const AccountDetail = ({ accountType }) => {
  const [tourist, setTourist] = useState([]);
  const [agent, setAgent] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;
  const history = useHistory();
  const tokenAgent = localStorage.getItem("tokenAgent");

  useEffect(() => {
    var url = api + "account/type?type=" + "TOURIST";
    var url2 = api + "account/type?type=" + "AGENT";
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
    fetch(url2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAgent(data);
      });
  }, [accountType, toastFunc]);

  const detailTourist = (event) => {
    const id = event.currentTarget.value;
    history.push({
      pathname: "/admin/tourist",
      search: "?id=" + id,
    });
  };

  const detailAgent = (event) => {
    const id = event.currentTarget.value;
    history.push({
      pathname: "/admin/agent",
      search: "?id=" + id,
    });
  };

  const bannedAccount = (event) => {
    const id = event.currentTarget.value;
    axios
      .post(api + "admin/banned/" + id, [], {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenAgent,
        },
      })
      .then(function (response) {
        toastFunc("success", "Banned success");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
       
        
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
        });
        toastFunc("error", message);
      });
  };

  if (accountType.toString().toUpperCase() == "TOURIST") {
    return (
      <body>
        <ToastNotify />
        <section class="checkout-area ptb-40">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Tourist ID</th>
                      <th>Username</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  {tourist.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>
                          <button
                            class="default-btn btn-cancel"
                            value={item.id}
                            onClick={detailTourist}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          {item.accountType == "TOURIST_BANNED" ? (
                            <button
                              class="default-btn btn-cancel"
                              value={item.id}
                              onClick={bannedAccount}
                            >
                              Unbanned
                            </button>
                          ) : (
                            <button
                              class="default-btn btn-cancel"
                              value={item.id}
                              onClick={bannedAccount}
                            >
                              Banned
                            </button>
                          )}
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
        <ToastNotify />
        <section class="checkout-area ptb-40">
          <div class="container">
            <div class="order-details">
              <div class="order-table table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Agent ID</th>
                      <th>Username</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  {agent.map((item) => {
                    return (
                      <tbody>
                        <td>{item.id}</td>
                        <td>{item.username}</td>
                        <td>
                          <button
                            class="default-btn btn-cancel"
                            value={item.id}
                            onClick={detailAgent}
                          >
                            Detail
                          </button>
                        </td>
                        <td>
                          {item.accountType == "AGENT_BANNED" ? (
                            <button
                              class="default-btn btn-cancel"
                              value={item.id}
                              onClick={bannedAccount}
                            >
                              Unbanned
                            </button>
                          ) : (
                            <button
                              class="default-btn btn-cancel"
                              value={item.id}
                              onClick={bannedAccount}
                            >
                              Banned
                            </button>
                          )}
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
  }
};

export default AccountDetail;
