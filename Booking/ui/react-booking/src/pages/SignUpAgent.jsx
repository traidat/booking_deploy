import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const SignUpAgent = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState();
  const api = process.env.REACT_APP_API_DOMAIN;

  const submit = async (e) => {
    e.preventDefault();
    const token = await signUpUser({
      username,
      password,
    });
  };

  async function signUpUser(credentials) {
    if (password!=repassword) {
      toastFunc("error", "Confirm password wrong");
    } else if (password.length < 3) {
      toastFunc("error", "Password too short");
    } else {
      axios
      .post(api + "account/0", credentials)
      .then(function (response) {
        history.push({
          pathname: "/agent",
          search: "?id=" + response.data.id,
        });
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
        });
        toastFunc("error", message);
      });
    }
    
  }

  return (
    <body>
       <ToastNotify />
      <div class="page-title-area">
        <div class="container">
          <section class="user-area-all-style sign-up-area ptb-20">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="contact-form-action">
                    <div class="form-heading text-center">
                      <h3 class="form-title">Create an agent account!</h3>
                    </div>
                    <form onSubmit={submit} className="style-form-login-signup">
                      <div class="row">
                        <div class="col-md-12 col-sm-12">
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
                        <div class="col-md-12 col-sm-12">
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
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Confirm password <span class="required"></span>
                            </label>
                            <input
                              type="password"
                              required
                              className="form-control"
                              placeholder="Confirm Password"
                              value={repassword}
                              onChange={(e) =>
                                setRePassword(e.currentTarget.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <button class="default-btn btn-two" type="submit">
                            Register Account
                            <i class="flaticon-right"></i>
                          </button>
                        </div>
                        <div class="col-12">
                          <p class="account-desc">
                            Already have an account?
                            <a href="/login_agent"> Login</a>
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
      </div>
    </body>
  );
};

export default SignUpAgent;
