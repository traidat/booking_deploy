import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import HotelList from "../component/HotelList";
import moment from "moment";
import DatePicker from "react-datepicker";

const Hotels = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const history = useHistory();

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(params.get("country"));
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState(params.get("city"));
  const [fromDate, setFromDate] = useState(new Date(params.get("fromDate")));
  const [toDate, setToDate] = useState(new Date(params.get("toDate")));
  const [adult, setAdult] = useState(params.get("adult"));
  const [children, setChildren] = useState(params.get("children"));
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const api = process.env.REACT_APP_API_DOMAIN;


  useEffect(() => {
    fetch(api + "country")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  useEffect(() => {
    let ct = country.replaceAll(" ", "+");
    var url = api + "city?country=" + ct;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      });
  }, [country]);

  const submit = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/hotel",
      search:
        "?country=" +
        country +
        "&city=" +
        city +
        "&fromDate=" +
        moment(fromDate).format("YYYY-MM-DD") +
        "&toDate=" +
        moment(toDate).format("YYYY-MM-DD") +
        "&adult=" +
        adult +
        "&children=" +
        children,
    });
  };

  return (
    <body>
      <section class="eorik-slider-area">
        <div class="eorik-slider-item slider-item-bg-1">
          <div class="d-table">
            <div class="d-table-cell">
              <div class="container">
                <div class="eorik-slider-text overflow-hidden one eorik-slider-text-one">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div class="check-area mb-minus-70">
        <div class="container">
          <form class="check-form" onSubmit={submit}>
            <h2 class="checking-room">CHECKING ROOM</h2>
            <div class="row align-items-center">
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Country</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <select
                        name="country"
                        id="country"
                        className="form-control"
                        value={country}
                        onChange={(e) => {setCountry(e.currentTarget.value)}}
                      >
                        {countries.map((item) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-th"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>city</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <select
                        name="city"
                        id="city"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                      >
                        {cities.map((item) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-th"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Arrival Date</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={fromDate}
                        selectsStart
                        minDate={new Date()}
                        startDate={fromDate}
                        endDate={toDate}
                        name="From date"
                        onChange={(e) => setFromDate(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Departure Date</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        name="To Date"
                        selected={toDate}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={fromDate}
                        onChange={(e) => setToDate(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div class="row align-items-center" style={{marginTop:'3%'}}>
              <div class="col-lg-3 col-sm-6">
                <div class="row">
                  <div class="col-lg-6 col-sm-6">
                    <div class="check-content">
                      <p>Adults</p>
                      <div class="form-group">
                        <select
                          name="adult"
                          class="form-content"
                          onChange={(e) => setAdult(e.currentTarget.value)}
                          value={adult}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6">
                    <div class="check-content">
                      <p>Children</p>
                      <div class="form-group">
                        <select
                          name="adult"
                          class="form-content"
                          value={children}
                          onChange={(e) => setChildren(e.currentTarget.value)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Min price($)</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <input
                        type="number"
                        class="form-control"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Max price($)</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <input
                        type="number"
                        class="form-control"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="check-btn check-content mb-0">
                  <button class="default-btn">
                    Check Availability
                    <i class="flaticon-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


      {/* <div class="check-area mb-minus-70">
        <div class="container">
          <form class="check-form" onSubmit={submit}>
            <div class="row align-items-center">
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Country</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <select
                        name="country"
                        id="country"
                        className="form-control"
                        value={country}
                        onChange={(e) => {setCountry(e.currentTarget.value)}}
                      >
                        {countries.map((item) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-th"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>city</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <select
                        name="city"
                        id="city"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.currentTarget.value)}
                      >
                        {cities.map((item) => {
                          return (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                      <span class="input-group-addon">
                        <i class="glyphicon glyphicon-th"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Arrival Date</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-1">
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        selected={fromDate}
                        selectsStart
                        minDate={new Date()}
                        startDate={fromDate}
                        endDate={toDate}
                        name="From date"
                        onChange={(e) => setFromDate(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Departure Date</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <DatePicker
                        dateFormat="yyyy-MM-dd"
                        name="To Date"
                        selected={toDate}
                        selectsEnd
                        startDate={fromDate}
                        endDate={toDate}
                        minDate={fromDate}
                        onChange={(e) => setToDate(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="row">
                  <div class="col-lg-6 col-sm-6">
                    <div class="check-content">
                      <p>Adults</p>
                      <div class="form-group">
                        <select
                          name="adult"
                          class="form-content"
                          onChange={(e) => setAdult(e.currentTarget.value)}
                          value={adult}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6">
                    <div class="check-content">
                      <p>Children</p>
                      <div class="form-group">
                        <select
                          name="adult"
                          class="form-content"
                          value={children}
                          onChange={(e) => setChildren(e.currentTarget.value)}
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Min price</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <input
                        type="number"
                        class="form-control"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="check-content">
                  <p>Max price</p>
                  <div class="form-group">
                    <div class="input-group date" id="datetimepicker-2">
                      <input
                        type="number"
                        class="form-control"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="check-btn check-content mb-0">
                  <button class="default-btn">
                    Check Availability
                    <i class="flaticon-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div> */}
      <HotelList
        fromDate={fromDate}
        toDate={toDate}
        country={country}
        city={city}
        adult={adult}
        children={children}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
    </body>
  );
};

export default Hotels;
