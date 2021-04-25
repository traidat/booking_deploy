import React, { useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";

const HotelFilter = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Viet+Nam");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("Ha+Noi");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState();
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const history = useHistory();
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

  const adultChange = (event) => {
    setAdult(event.currentTarget.value);
  };

  const childrenChange = (event) => {
    setChildren(event.currentTarget.value);
  };

  const countryChange = (event) => {
    setCountry(event.currentTarget.value);
  };

  const cityChange = (event) => {
    setCity(event.currentTarget.value);
  };

  const changeFromDate = (date) => {
    setFromDate(date);
  };

  const changeToDate = (date) => {
    setToDate(date);
  };

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
    <div class="check-area mb-minus-70">
      <div class="container">
        <form class="check-form" onSubmit={submit}>
        <h2 class="checking-room">CHECKING ROOM</h2>
          <div class="row align-items-center">
            <div class="col-lg-6 col-sm-6">
              <div class="check-content">
                <p>Country</p>
                <div class="form-group">
                  <div class="input-group date" id="datetimepicker-1">
                    <select
                      name="country"
                      id="country"
                      className="form-control"
                      value={country}
                      onChange={countryChange}
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
            <div class="col-lg-6 col-sm-6">
              <div class="check-content">
                <p>city</p>
                <div class="form-group">
                  <div class="input-group date" id="datetimepicker-1">
                    <select
                      name="city"
                      id="city"
                      className="form-control"
                      value={city}
                      onChange={cityChange}
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
            <div class="row align-items-center" style={{marginTop:'3%'}}>
            <div class="col-lg-3 col-sm-6">
              <div class="check-content">
                <p>Arrival Date</p>
                <div class="form-group">
                  <div class="input-group date" id="datetimepicker-1">
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={fromDate}
                      selectsStart
                      className="form-control"
                      minDate={new Date()}
                      startDate={fromDate}
                      endDate={toDate}
                      name="From date"
                      onChange={changeFromDate}
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
                      className="form-control"
                      selected={toDate}
                      selectsEnd
                      startDate={fromDate}
                      endDate={toDate}
                      minDate={fromDate}
                      onChange={changeToDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="row">
                <div class="col-lg-6 col-sm-6">
                  <div class="check-content">
                    <p>Adults</p>
                    <div class="form-group">
                      <select
                        name="adult"
                        class="form-content"
                        onChange={adultChange}
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
                        onChange={childrenChange}
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
            <div class="col-lg-3">
              <div class="check-btn check-content mb-0">
                <button class="default-btn">
                  Check Availability
                  <i class="flaticon-right"></i>
                </button>
              </div>
            </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelFilter;
