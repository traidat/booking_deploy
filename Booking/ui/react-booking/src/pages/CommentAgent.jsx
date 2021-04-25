import React, { useEffect, useState } from "react";
import CommentListAgent from "./CommentListAgent";

const CommentAgent = () => {
  const [hotels, setHotels] = useState([]);
  const tokenAgent = localStorage.getItem("tokenAgent");
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var url = api + "personal_agent";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setHotels(data);
      });
  }, []);

  return (
    <React.Fragment>
      {hotels.map((item) => {
        return (
          <div>
           <CommentListAgent id={item.agentId} hotels={hotels}/>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default CommentAgent;
