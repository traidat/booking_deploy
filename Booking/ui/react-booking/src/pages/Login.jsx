import axios from "axios";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import {toastFunc} from "../utils/common"
import ToastNotify from "../component/ToastNotify"

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const api = process.env.REACT_APP_API_DOMAIN;
  const [login, setLogin] = useState(false);
  const history = useHistory();

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
        if (response.data.accountType === "TOURIST") {
          localStorage.setItem("token", response.data.token);
          setToken(response.data.token);
        } else {
          toastFunc("error","Wrong username or password")
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

  const responseFacebook = (response) => {
    const api = process.env.REACT_APP_API_DOMAIN;
    const user = {
      email: response.email,
      name: response.name,
    };
  
    if (response.accessToken) {
      setLogin(true);
      axios
        .post(api + "fb", user)
        .then(function (res) {
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
          } else {
            history.push({
              pathname: "/tourist/fb",
              search:
                "?id=" +
                res.data.id +
                "&name=" +
                response.name +
                "&email=" +
                response.email +
                "&image=" +
                response.picture.data.url.replaceAll("&", "+"),
            });
          }
        })
        .catch(function (error) {
          var message = "";
          error.response.data.map((err) => {
            message = err.message;
          });
          
        });
    } else {
      setLogin(false);
    }
  };

  return (
    <body>
      <ToastNotify/>
      <div class="page-title-area">
        <div class="container">
          <section class="user-area-all-style log-in-area ptb-20">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="contact-form-action">
                    <div class="form-heading text-center">
                      <h3 class="form-title">Login to your account!</h3>
                    </div>
                    {!login && (
                      <FacebookLogin
                        appId="422208619037149"
                        autoLoad={false}
                        textButton="Start with Facebook"
                        fields="name,email,picture"
                        scope="public_profile,user_friends,email"
                        callback={responseFacebook}
                        icon="fa-facebook"
                      />
                    )}
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
                            Not a member?
                            <a href="/signup/tourist">Register</a>
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
export default Login;
