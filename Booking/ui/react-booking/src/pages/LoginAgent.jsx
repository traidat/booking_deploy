import axios from "axios";
import React, { useState } from "react";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const LoginAgent = ({ setTokenAgent }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = process.env.REACT_APP_API_DOMAIN;

  const submit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
  };

  async function loginUser(credentials) {
    axios
      .post(api + "login", credentials)
      .then(function (response) {
        if (response.data.accountType === "AGENT") {
          localStorage.setItem("tokenAgent", response.data.token);
          setTokenAgent(response.data.token);
        } else {
          toastFunc("error", "Wrong username or password");
        }
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
        });
        toastFunc("error", message);
      });
  }

  return (
    <body>
      <div class="page-title-area">
        <div class="container">
          <section class="user-area-all-style log-in-area ptb-20">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="contact-form-action">
                    <div class="form-heading text-center">
                      <h3 class="form-title">Login to your agent account!</h3>
                    </div>
                    <form onSubmit={submit} className="style-form-login-signup">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label>
                              Username <span class="required"></span>
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              placeholder="Enter username"
                              value={username}
                              onChange={(e) =>
                                setUsername(e.currentTarget.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form-group">
                            <label>
                              Password <span class="required"></span>
                            </label>
                            <input
                              type="password"
                              required
                              className="form-control"
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) =>
                                setPassword(e.currentTarget.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <button class="default-btn btn-two" type="submit">
                            Log In Now
                            <i class="flaticon-right"></i>
                          </button>
                        </div>
                        <div class="col-12">
                          <p class="account-desc">
                            Not a agent?
                            <a href="/signup/agent">Register</a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ToastNotify />
      </div>
    </body>
  );
};
export default LoginAgent;
