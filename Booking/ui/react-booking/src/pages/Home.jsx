import React from "react";
import Logo from "../assets/img/home-one/slider/slider-img-1.jpg";
import whiteTop from "../assets/img/shape/white-shape-top.png";
import whiteBottom from "../assets/img/shape/white-shape-bottom.png";
import HotelFilter from "../component/HotelFilter";

const Home = () => {
  return (
    <body>
      <section class="eorik-slider-area">
        <div class="eorik-slider-item slider-item-bg-1">
          <div class="d-table">
            <div class="d-table-cell">
              <div class="container"></div>
            </div>
          </div>
        </div>
      </section>
      <HotelFilter />

      <section class="explore-area pt-70 pb-100">
        <div class="container">
          <div class="section-title">
            <span>Explore</span>
            <h2>We are cool to give you pleasure</h2>
          </div>
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="explore-img">
                <img src={Logo} alt="Image" />
              </div>
            </div>
            <div class="col-lg-6" style={{ lineHeight: 1.3 }}>
              <div class="explore-content ml-30">
                <h2>As much as comfort want to get from us everything</h2>
                <p>
                  How do you describe a hotel that defies description? Many of
                  our customers say that it is the perfect mix of great
                  location, below-market rates, amenities and social activities
                  for the guests. But I call the Explore Hotel an experience. It
                  is the home of hipsters, the budget-conscious businessperson,
                  and the avant-garde. You have to experience it to truly
                  appreciate its eclectic atmosphere. I think it makes me proud
                  because everything from the decor, to the people and the
                  place, all have great warmth. It’s a privilege to be part of
                  that.
                </p>
                <p>
                  Yes, it gives us a chance to get to know our guests. And it’s
                  led to even better things for us, too. After starting a guest
                  engagement program, we are so proud that in less than year, we
                  have been rated the best hostel in the New York metro area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="facilities-area pb-60 pt-80" id="service">
        <div class="container">
          <div class="section-title">
            <span>Facilities</span>
            <h2>Giving entirely awesome</h2>
          </div>
          <div class="row">
            <div class="col-lg-3 col-sm-6">
              <div class="single-facilities-wrap">
                <div class="single-facilities">
                  <i class="facilities-icon flaticon-pickup"></i>
                  <h3>Pick Up & Drop​</h3>
                  <p>Free pick up and drop everywhere</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="single-facilities-wrap">
                <div class="single-facilities">
                  <i class="facilities-icon flaticon-coffee-cup"></i>
                  <h3>Welcome Drink​​​​</h3>
                  <p>Fantastic drink is waiting for you</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="single-facilities-wrap">
                <div class="single-facilities">
                  <i class="facilities-icon flaticon-garage"></i>
                  <h3>​​Parking Space</h3>
                  <p>A lot of parking space for your car</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-sm-6">
              <div class="single-facilities-wrap">
                <div class="single-facilities">
                  <i class="facilities-icon flaticon-water"></i>
                  <h3>Cold Hot & Water​</h3>
                  <p>Cold and hot water for all people</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="incredible-area ptb-140 jarallax">
        <div class="container">
          <div class="incredible-content">
            <a
              href="https://www.youtube.com/watch?v=bk7McNUjWgw"
              class="video-btn popup-youtube"
            >
              <i class="flaticon-play-button"></i>
            </a>
            <h2>
              <span>Incredible!</span> Are you coming today
            </h2>
            <p>
              Also known as travel clerks or reservationists, Reservation Agents
              provide booking and reservation services to customers. We work
              with customers over the phone, in person, or via email and strive
              to provide excellent customer service.
            </p>
          </div>
        </div>
        <div class="white-shape">
          <img src={whiteTop} alt="Image" />
          <img src={whiteBottom} alt="Image" />
        </div>
      </section>

      <section class="bokking-area pb-100 pt-100" id="benefit">
        <div class="container">
          <div class="section-title">
            <span>Booking</span>
            <h2>Direct booking benefits</h2>
          </div>
          <div class="row">
            <div class="booking-col-2">
              <div class="single-booking">
                <i class="book-icon flaticon-online-booking"></i>
                <span class="booking-title">Free cost</span>
                <h3>No booking fee</h3>

                <div class="modal fade" id="staticBackdrop">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">No booking fee</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Also known as travel clerks or reservationists,
                          Reservation Agents provide booking and reservation
                          services to customers. We work with customers over the
                          phone, in person, or via email and strive to provide
                          excellent customer service.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <a href="book-table.html" class="default-btn">
                          Book Now
                          <i class="flaticon-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="booking-col-2">
              <div class="single-booking">
                <i class="book-icon flaticon-podium"></i>
                <span class="booking-title">Free cost</span>
                <h3>Best rate guarantee</h3>

                <div class="modal fade" id="staticBackdrop-2">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Best rate guarantee</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Also known as travel clerks or reservationists,
                          Reservation Agents provide booking and reservation
                          services to customers. We work with customers over the
                          phone, in person, or via email and strive to provide
                          excellent customer service.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <a href="book-table.html" class="default-btn">
                          Book Now
                          <i class="flaticon-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="booking-col-2">
              <div class="single-booking">
                <i class="book-icon flaticon-airport"></i>
                <span class="booking-title">Free cost</span>
                <h3>Reservations 24/7</h3>

                <div class="modal fade" id="staticBackdrop-3">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Reservations 24/7</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Also known as travel clerks or reservationists,
                          Reservation Agents provide booking and reservation
                          services to customers. We work with customers over the
                          phone, in person, or via email and strive to provide
                          excellent customer service.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <a href="book-table.html" class="default-btn">
                          Book Now
                          <i class="flaticon-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="booking-col-2">
              <div class="single-booking">
                <i class="book-icon flaticon-slow"></i>
                <span class="booking-title">Free cost</span>
                <h3>High-speed Wi-Fi</h3>

                <div class="modal fade" id="staticBackdrop-4">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">High-speed Wi-Fi</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Also known as travel clerks or reservationists,
                          Reservation Agents provide booking and reservation
                          services to customers. We work with customers over the
                          phone, in person, or via email and strive to provide
                          excellent customer service.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <a href="book-table.html" class="default-btn">
                          Book Now
                          <i class="flaticon-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="booking-col-2">
              <div class="single-booking">
                <i class="book-icon flaticon-coffee-cup-1"></i>
                <span class="booking-title">Free cost</span>
                <h3>Free breakfast</h3>

                <div class="modal fade" id="staticBackdrop-5">
                  <div
                    class="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">Free breakfast</h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <p>
                          Also known as travel clerks or reservationists,
                          Reservation Agents provide booking and reservation
                          services to customers. We work with customers over the
                          phone, in person, or via email and strive to provide
                          excellent customer service.
                        </p>
                      </div>
                      <div class="modal-footer">
                        <a href="book-table.html" class="default-btn">
                          Book Now
                          <i class="flaticon-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
};

export default Home;
