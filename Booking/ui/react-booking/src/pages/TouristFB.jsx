import axios from "axios";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {toastFunc} from "../utils/common"
import ToastNotify from "../component/ToastNotify"

const TouristFB = ({setToken}) => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [name, setName] = useState(params.get("name"));
  const [email, setEmail] = useState(params.get("email"));
  const [url, setUrl] = useState(params.get("image").replaceAll(" ", "&"))
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const api = process.env.REACT_APP_API_DOMAIN;


  const submit = async (e) => {
    e.preventDefault();
    const token = await signUpUser({
      name,
      email,
      age,
      phone,
      url,
    });
  };

  async function signUpUser(user) {
    axios
      .post(api + "signup/" + id, user)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        history.push({
          pathname: "/login",
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


  return (
    <body>
      <ToastNotify/>
      <div class="page-title-area">
        <div class="container">
          <div class="page-title-content">
            <h2>Sign Up</h2>
          </div>
        </div>
      </div>
      <section class="user-area-all-style sign-up-area ptb-100">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <div class="contact-form-action">
                <div class="form-heading text-center">
                  <h3 class="form-title">Create an tourist!</h3>
                </div>
                <form onSubmit={submit} className="style-form-login-signup">
                  <div class="row">
                    <div class="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label>
                          Full name <span class="required"></span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter full name"
                          value={name}
                          readOnly
                          onChange={(e) => setName(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label>
                          Email <span class="required"></span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          readOnly
                          onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label>
                          Age <span class="required"></span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter age"
                          value={age}
                          required
                          onChange={(e) => setAge(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                    <div class="col-md-12 col-sm-12">
                      <div class="form-group">
                        <label>
                          Phone <span class="required"></span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter phone"
                          value={phone}
                          required
                          onChange={(e) => setPhone(e.currentTarget.value)}
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <button class="default-btn btn-two" type="submit">
                        Save
                        <i class="flaticon-right"></i>
                      </button>
                    </div>
                    <div class="col-12">
                      <p class="account-desc">
                        Already have an account?
                        <a href="/login"> Login</a>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default TouristFB;
