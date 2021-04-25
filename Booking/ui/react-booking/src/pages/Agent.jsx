import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import ChooseFromMap from "../component/ChooseFromMap";
import ImagePick from "../component/ImagePick";
import ToastNotify from "../component/ToastNotify";
import { toastFunc } from "../utils/common";

const Agent = () => {
  const location = useLocation();
  const history = useHistory();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Viet+Nam");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("Ha+Noi");
  const [service, setService] = useState([]);
  const [servicesHotel, setServicesHotel] = useState([]);
  const [image, setImage] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;
  const [ln, setLn] = useState();
  const [la, setLa] = useState();
  const [add, setAdd] = useState();

  useEffect(() => {
    fetch(api + "agent/service")
      .then((response) => response.json())
      .then((data) => {
        setService(data);
      });
  }, []);

  useEffect(() => {
    fetch(api + "agent/country")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    var url = api + "agent/city?name=" + country;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      });
  }, [country]);

  const submit = async (e) => {
    
    e.preventDefault();
    const token = await signUpUser({
      name,
      email,
      phone,
      address,
      description,
      country: country.replace("+", " "),
      city: city.replace("+", " "),
      agentType: "HOTEL",
      services: servicesHotel,
      images: image,
      lat: la,
      lng: ln,
    });
  };
  async function signUpUser(credentials) {
    axios
      .post(api + "agent/signup/" + id, credentials)
      .then(function (response) {
        toastFunc("success", "Add new hotel success");
        setTimeout(() => {
          history.push("/home");
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
    if (listService.length == 0) {
      listService.push(serviceId);
      setServicesHotel(listService);
    } else {
      listService.map((item) => {
        if (item == serviceId) {
          listService.splice(listService.indexOf(item), 1);
          setServicesHotel(listService);
          isExist = true;
        }
      });
      if (isExist == false) {
        listService.push(serviceId);
        setServicesHotel(listService);
      }
    }
  };

  return (
    <body>
      <ToastNotify />
      <div class="page-title-area">
        <div class="container">
          <section class="user-area-all-style sign-up-area ptb-50">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="contact-form-action">
                    <div class="form-heading text-center">
                      <h3 class="form-title">Create new hotel</h3>
                    </div>
                    <form onSubmit={submit} className="style-form-login-signup">
                      <div class="row">
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Name <span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              placeholder="Enter name"
                              value={name}
                              onChange={(e) => setName(e.currentTarget.value)}
                            />
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Email <span class="required">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              className="form-control"
                              placeholder="Enter email"
                              value={email}
                              onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Phone <span class="required">*</span>
                            </label>
                            <input
                              type="number"
                              required
                              className="form-control"
                              placeholder="Enter phone"
                              value={phone}
                              onChange={(e) => setPhone(e.currentTarget.value)}
                            />
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Country <span class="required">*</span>
                            </label>
                            <select
                              name="country"
                              id="country"
                              className="form-control"
                              value={country}
                              onChange={(e) => {
                                setCountry(e.currentTarget.value);
                              }}
                            >
                              {countries.map((item) => {
                                return (
                                  <option
                                    key={item.countryId}
                                    value={item.countryName}
                                  >
                                    {item.countryName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              City <span class="required">*</span>
                            </label>
                            <select
                              name="city"
                              id="city"
                              className="form-control"
                              value={city}
                              onChange={(e) => {
                                setCity(e.currentTarget.value);
                              }}
                            >
                              {cities.map((item) => {
                                return (
                                  <option
                                    key={item.cityId}
                                    value={item.cityName}
                                  >
                                    {item.cityName}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <label>
                              Address <span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              placeholder="Enter address"
                              value={address}
                              onChange={(e) =>
                                setAddress(e.currentTarget.value)
                              }
                            />
                          </div>
                        </div>
                        <div class="form-group">
                          <div className="main-wrapper">
                            <label>
                              Choose your hotel location
                              <span class="required">*</span>
                            </label>
                            <ChooseFromMap
                              ln={ln}
                              setln={setLn}
                              la={la}
                              setla={setLa}
                            />
                          </div>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <div class="form-group">
                            <br />
                            <br />
                            <br />
                            <br />
                            <label>
                              Description <span class="required">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              placeholder="Enter description"
                              value={description}
                              onChange={(e) =>
                                setDescription(e.currentTarget.value)
                              }
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
        </div>
      </div>
    </body>
  );
};

export default Agent;
