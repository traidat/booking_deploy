import React, { useEffect, useState } from "react";
import Logo from "../assets/images/logo.png";
import whiteBottom from "../assets/img/shape/white-shape-bottom.png";

const Footer = () => {
  const [service, setService] = useState([]);
  const api = process.env.REACT_APP_API_DOMAIN;

  useEffect(() => {
    fetch(api + "agent/service")
      .then((response) => response.json())
      .then((data) => {
        setService(data);
      });
  }, []);
  return (
    <footer class="footer-top-area pt-140 jarallax" id="footer">
      <div class="container">
        <div class="footer-middle-area pt-60">
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="single-widget">
                <a href="#">
                  <img src={Logo} alt="Image" />
                </a>
                <p>
                  Also known as travel clerks or reservationists, Reservation
                  Agents provide booking and reservation services to customers.
                  We work with customers over the phone, in person, or via email
                  and strive to provide excellent customer service.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-widget">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <a href="https://vnexpress.net/" target="_blank">
                      <i class="right-icon bx bx-chevrons-right"></i>
                      News
                    </a>
                  </li>
                  <li>
                    <a href="https://www.marriott.com/default.mi" target="_blank">
                      <i class="right-icon bx bx-chevrons-right"></i>
                      Best hotel
                    </a>
                  </li>
                  <li>
                    <a href="https://www.agoda.com/" target="_blank">
                      <i class="right-icon bx bx-chevrons-right"></i>
                      Similar website
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="single-widget">
                <h3>Contact Info</h3>
                <ul class="information">
                  <li class="address">
                    <i class="flaticon-maps-and-flags"></i>
                    <span>Address</span>
                    19 Duy Tan, Cau Giay, Ha Noi
                  </li>
                  <li class="address">
                    <i class="flaticon-call"></i>
                    <span>Phone</span>
                    <a href="tel:+84333151617"> +84333151617 </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-shape">
        <img src={whiteBottom} alt="Image" />
      </div>
    </footer>
  );
};

export default Footer;
