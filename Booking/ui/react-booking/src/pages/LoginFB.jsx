import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginFB = () => {
  const [login, setLogin] = useState(false);
  const history = useHistory();

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
              localStorage.setItem('token', res.data.token);
              
          } else {
              history.push({
                pathname: "/tourist/fb",
                search: "?id=" + res.data.id + "&name=" + response.name + "&email=" + response.email,
              });
          }
        })
        .catch(function (error) {
          var message = "";
          error.response.data.map((err) => {
            message = err.message;
          });
          alert(message);
        });
    } else {
      setLogin(false);
    }
  };

  return (
    <div class="container">
      <br />
      <br />
      <br />
      <br />

      {!login && (
        <FacebookLogin
          appId="422208619037149"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,email"
          callback={responseFacebook}
          icon="fa-facebook"
        />
      )}
    </div>
  );
};

export default LoginFB;
