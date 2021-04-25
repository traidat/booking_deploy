import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

const LineAdmin = ({ fromDate, toDate}) => {
  const from = moment(fromDate).format("YYYY-MM-DD");
  const to = moment(toDate).format("YYYY-MM-DD");
  const [label, setLabel] = useState([]);
  const [order, setOrder] = useState([]);
  const [data, setData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;
  const [listColor, setColor] = useState([
    "olive",
    "lime",
    "aqua",
    "maroon",
    "crimson",
    "red",
    "blue",
    "yellow",
    "lavender",
    "salmon",
    "azure",
    "cyan"
  ]);

  useEffect(() => {
    var url = api + "admin/all/order";
    var tokenAgent = localStorage.getItem("tokenAgent");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      });
  }, [fromDate, toDate]);

  useEffect(() => {
    var date = new Date(fromDate);
    var listLabel = [];
    while (
      moment(date).format("YYYY-MM-DD") <= moment(toDate).format("YYYY-MM-DD")
    ) {
      listLabel.push(moment(date).format("YYYY-MM-DD"));
      date.setDate(date.getDate() + 1);
    }
    setLabel(listLabel);

    var listRoom = [];
    order.map((item) => {
      if (!listRoom.includes(item.roomName)) {
        listRoom.push(item.roomName);
      }
    });
    setListRoom(listRoom);
  }, [order]);

  useEffect(() => {
    var listDataset = [];
    var color = Array.from(listColor);
    for (var j = 0; j < listRoom.length; j++) {
      var listData = [];
      for (var i = 0; i < label.length; i++) {
        listData.push(0);
        order.map((item) => {
          if (
            moment(item.fromDate).format("YYYY-MM-DD") <=
              moment(label[i]).format("YYYY-MM-DD") &&
            moment(item.toDate).format("YYYY-MM-DD") >=
              moment(label[i]).format("YYYY-MM-DD") &&
            item.roomName === listRoom[j] && item.orderStatus == "ORDER"
          ) {
            var temp = listData.pop();
            listData.push(temp + item.numberRoom);
          }
        });
      }
      listDataset.push({
        label: listRoom[j],
        fill: false,
        borderColor: color[j],
        data: listData,
      });
    }
    setDataset(listDataset);
  }, [label, listRoom]);

  return (
    <Line
      data={{
        labels: label,
        datasets: dataset,
      }}
      options={{
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#323130",
            fontSize: 14,
          },
        },
        title: {
          display: true,
          fontSize: 16,
          text: "Number of room order from " + from + " to " + to,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 20,
              },
            },
          ],
        },
      }}
    />
  );
};

export default LineAdmin;
