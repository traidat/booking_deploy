import { func } from "prop-types";
import React, { useEffect, useState } from "react";

import Logo from "../assets/images/logo.png";

const Navbar = ({ token, setToken }) => {
  const [tourist, setTourist] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  const signout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  useEffect(() => {
    var url = api + "personal";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTourist(data);
      });
  }, [token]);
  
  const listItem = token ? ["/","/personal","/login_agent", "/signup/tourist"] : ["/", "/login", "/signup/tourist", "/login_agent", , , "/personal"]
  
  useEffect(() => {
   let index = window.location.pathname ? listItem.indexOf(window.location.pathname) : 0;
   let activeElement =  document.getElementsByClassName('nav-item')[index];
      if (activeElement) {
        activeElement.classList.add("active-nav");
      }
  }, [])

  return (
    <div class="eorik-nav-style fixed-top">
      <div class="navbar-area">
        <div class="main-nav">
          <nav class="navbar navbar-expand-md navbar-light bg-dark">
            <div class="container">
              <a class="navbar-brand" href="/">
                <img src={Logo} alt="Logo" />
              </a>
              <div
                class="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav m-auto">
                  <li class="nav-item">
                    <a href="/" class="nav-link dropdown-toggle active">
                      Home
                    </a>
                  </li>
                  {!token ? (
                    <li class="nav-item">
                      <a href="/login" class="nav-link dropdown-toggle active">
                        Login
                      </a>
                    </li>
                  ) : (
                    <li class="nav-item">
                      {tourist.map((item) => {
                        return (
                          <a
                            href="/personal"
                            class="nav-link dropdown-toggle active"
                          >
                            {item.name}
                          </a>
                        );
                      })}
                    </li>
                  )}

                  {!token ? (
                    <li class="nav-item">
                      <a href="/signup/tourist" class="nav-link dropdown-toggle active">
                        Sign Up
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  <li class="nav-item">
                    <a
                      href="/login_agent"
                      class="nav-link dropdown-toggle active"
                    >
                      Partner
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      href="/admin"
                      class="nav-link dropdown-toggle active"
                    >
                      Admin
                    </a>
                  </li>
                  
                  <li class="nav-item">
                    <a href="#footer" class="nav-link dropdown-toggle active">
                      Contacts
                    </a>
                  </li>

                  {token ? (
                    <li class="nav-item">
                      <a
                        href="#"
                        class="nav-link dropdown-toggle active"
                        onClick={signout}
                      >
                        Sign Out
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                </ul>

                <div class="others-option">
                  <a class="call-us" href="tel:+84333151617">
                    <i class="bx bx-phone-call bx-tada"></i>
                    +84333151617
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Navbar;


