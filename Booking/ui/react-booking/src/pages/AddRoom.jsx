import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ImagePick from "../component/ImagePick";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const AddRoom = () => {
  const [roomName, setRoomName] = useState();
  const [price, setPrice] = useState();
  const [numberRoom, setNumberRoom] = useState();
  const [adult, setAdult] = useState();
  const [children, setChildren] = useState();
  const [service, setService] = useState([]);
  const [servicesHotel, setServicesHotel] = useState([]);
  const history = useHistory();
  const [image, setImage] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const api = process.env.REACT_APP_API_DOMAIN;
  let hotelId = 0;
  if (params) {
    hotelId = params.get("id");
  }

  useEffect(() => {
    fetch(api + "agent/service")
      .then((response) => response.json())
      .then((data) => {
        setService(data);
      });
  }, []);
  const submit = async (e) => {
    e.preventDefault();
    const token = await addRoom({
      children,
      hotelId,
      adult,
      price,
      numberRoom,
      roomName,
      services: servicesHotel,
      url: image,
    });
  };
  async function addRoom(room) {
    const tokenAgent = localStorage.getItem("tokenAgent");
    axios
      .post(api + "agent/hotel/room", room, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenAgent,
        },
      })
      .then(function (response) {
        toastFunc("success", "Add success");

        setTimeout(() => {
          history.push("/agent/hotel?id=" + hotelId);
        }, 3000);
        
      })
      .catch(function (error) {
        var message = "";
        error.response.data.map((err) => {
          message = err.message;
        });
        toastFunc("error", message);
      });
  }

  const addservice = (event) => {
    var serviceId = parseInt(event.currentTarget.value, 10);
    var listService = Array.from(servicesHotel);
    var isExist = false;
    if (listService.length === 0) {
      listService.push(serviceId);
      setServicesHotel(listService);
    } else {
      listService.map((item) => {
        if (item === serviceId) {
          listService.splice(listService.indexOf(item), 1);
          setServicesHotel(listService);
          isExist = true;
        }
      });
      if (isExist === false) {
        listService.push(serviceId);
        setServicesHotel(listService);
      }
    }
  };
  return (
    <section class="user-area-all-style log-in-area ptb-100">
      <ToastNotify/>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="contact-form-action">
              <div class="form-heading text-center">
                <h3 class="form-title">Add new room</h3>
              </div>
              <form onSubmit={submit}>
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <label>Room name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter room name"
                        value={roomName}
                        onChange={(e) => setRoomName(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>Number of room</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter number room"
                        value={numberRoom}
                        onChange={(e) => setNumberRoom(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>Price($)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>Adult</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter number of adult"
                        value={adult}
                        onChange={(e) => setAdult(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <label>Children</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter number of children"
                        value={children}
                        onChange={(e) => setChildren(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 form-condition">
                    <label>
                      Service <span class="required"></span>
                    </label>
                    {service.map((item) => {
                      return (
                        <div class="agree-label">
                          <input
                            type="checkbox"
                            onChange={addservice}
                            value={item.serviceId}
                          />
                          <label for="chb1">{item.serviceName}</label>
                        </div>
                      );
                    })}
                  </div>
                  <ImagePick image={image} setImage={setImage} />
                  <br />
                  <br />
                  <div class="col-12">
                    <button class="default-btn btn-two" type="submit">
                      Save
                      <i class="flaticon-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
