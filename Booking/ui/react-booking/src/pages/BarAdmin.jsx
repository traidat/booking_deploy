import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { toastFunc } from "../utils/common";

const BarAdmin = ({ year }) => {
  const [finish, setFinish] = useState([]);
  const [label, setLabel] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [listFinish, setListFinish] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    var listLabel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var finishList = [];
    var total = [];
    for (var i = 0; i < 12; i++) {
      finishList.push(0);
      total.push(0);
      finish.map((item) => {
        var from = new Date(item.fromDate);
        var m = from.getMonth();
        var y = from.getFullYear();
        if (m + 1 == listLabel[i] && year == y && item.orderStatus == "FINISH") {
          var temp = finishList.pop();
          var price = total.pop();
          total.push(price + item.totalPrice);
          finishList.push(temp + item.numberRoom);
        }
      });
    }
    setListFinish(finishList);
    setTotalPrice(total)
  }, [finish]);

  useEffect(() => {
    const tokenAgent = localStorage.getItem("tokenAgent");
    var url1 = api + "admin/all/order";

    fetch(url1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + tokenAgent,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFinish(data);
      });
  }, [year]);

  return (
    <Bar
      data={{
        labels: label,
        datasets: [
          {
            label: "room ordered",
            backgroundColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            yAxisID: 'room',
            data: listFinish,
          },
          {
            label: "total revenue ($)",
            backgroundColor: "rgba(255,190,132,1)",
            borderWidth: 1,
            yAxisID: 'price',
            data: totalPrice,
          },
        ],
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
          text: "Number of room ordered and total revenue in " + year,
        },
        scales: {
          yAxes: [{
            id: 'room',
            type: 'linear',
            position: 'left',
          }, {
            id: 'price',
            type: 'linear',
            position: 'right',
            ticks: {
              max: 1000,
              min: 0
            }
          }]
        }
      }}
    />
  );
};

export default BarAdmin;
