import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";

const NavbarAgent = ({
  tokenAgent,
  setTokenAgent,
  setTokenAdmin,
  tokenAdmin,
}) => {
  const [agent, setAgent] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  const signout = () => {
    localStorage.removeItem("tokenAgent");
    setTokenAgent("");
    localStorage.removeItem("tokenAdmin");
    setTokenAdmin("");
  };
  useEffect(() => {
    var url1 = api + "account";
    fetch(url1, {
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
  }, [tokenAgent]);

  const listItem = tokenAgent
    ? ["/home", "/personal_agent"]
    : ["/", "/login", "/signup/tourist", "/login_agent", , , "/personal"];

  useEffect(() => {
    let index = window.location.pathname
      ? listItem.indexOf(window.location.pathname)
      : 0;
    let activeElement = document.getElementsByClassName("nav-item")[index];
    if (activeElement) {
      activeElement.classList.add("active-nav");
    }
  }, []);

  return (
    <div class="eorik-nav-style fixed-top">
      <div class="navbar-area">
        <div class="main-nav">
          <nav class="navbar navbar-expand-md navbar-light bg-dark">
            <div class="container">
              {tokenAdmin ? (
                <a class="navbar-brand" href="/admin">
                  <img src={Logo} alt="Logo" />
                </a>
              ) : (
                <a class="navbar-brand" href="/home">
                  <img src={Logo} alt="Logo" />
                </a>
              )}

              <div
                class="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav m-auto">
                  <li class="nav-item">
                    {tokenAdmin ? (
                      <a href="/admin" class="nav-link dropdown-toggle active">
                        Home
                      </a>
                    ) : (
                      <a href="/home" class="nav-link dropdown-toggle active">
                        Home
                      </a>
                    )}
                  </li>
                  {tokenAgent  ? (
                    <li class="nav-item">
                      {agent.map((item) => {
                        return (
                          <a
                            href="#"
                            class="nav-link dropdown-toggle active"
                          >
                            {item.username}
                          </a>
                        );
                      })}
                    </li>
                  ) : (
                    <li class="nav-item">
                    <a href="/login_agent" class="nav-link dropdown-toggle active">
                      Login
                    </a>
                  </li>
                  )}

                  {!tokenAdmin ? (
                    <li class="nav-item">
                      <a href="/admin" class="nav-link dropdown-toggle active">
                        Admin
                      </a>
                    </li>
                  ) : null}

                  <li class="nav-item">
                    <a href="#footer" class="nav-link dropdown-toggle active">
                      Contacts
                    </a>
                  </li>
                  {tokenAgent ? (
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

export default NavbarAgent;
