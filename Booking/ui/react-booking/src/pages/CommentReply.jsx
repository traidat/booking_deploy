import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const CommentReply = ({ ratingId, hotelId, replies }) => {
  const api = process.env.REACT_APP_API_DOMAIN;
  const [reply, setReply] = useState(replies);
  const history = useHistory();
  

  const submit = (e) => {
    e.preventDefault();
    var data = {
      ratingId,
      hotelId,
      reply,
    };
    var tokenAgent = localStorage.getItem("tokenAgent");
    var url = api + "agent/reply";
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenAgent,
        },
      })
      .then((response) => {
        toastFunc("success", "Reply success");
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

  return (
    <form onSubmit={submit}>
      <ToastNotify/>
      <input
        type="text"
        className="form-control"
        placeholder="Enter reply"
        value={reply}
        onChange={(e) => setReply(e.currentTarget.value)}
      />
      <br/>
      <button
        type="submit"
        className="btn btn-primary btn-block"
      >
        Save
      </button>
    </form>
  );
};
export default CommentReply;
