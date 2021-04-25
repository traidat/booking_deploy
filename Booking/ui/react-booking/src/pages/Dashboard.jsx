import React, { useState } from "react";
import DatePicker from "react-datepicker";
import BarTotalRoomAndRevenue from "../component/BarTotalRoomAndRevenue";
import LineOrderedRoom from "../component/LineOrderedRoom";
import OrderFilterAgent from "../component/OrderFilterAgent";

const Dashboard = ({id, hotels}) => {
  const [year, setYear] = useState(2021);
  const f = new Date();
  const [fromDate, setFromDate] = useState(f);
  const t = new Date();
  t.setDate(f.getDate() + 7);
  const [toDate, setToDate] = useState(t);


  return (
    <body>
      <br />
      <br />
      <br />
      <div class="section-title">
        <br />
        <h2>Dashboard</h2>
      </div>
      <div class="container">
        <form class="check-form">
          <div class="row align-items-center">
            <div class="col-lg-6 col-sm-12">
              <div class="section-title">
                <h4>Room ordered and revenue</h4>
              </div>
              

              <div class="row align-items-center">
                <div class="col-lg-4 col-sm-4"></div>
              <div class="col-lg-4 col-md-4">
              <div class="check-content">
                  <p>Year</p>
                  <select
                    name="order"
                    id="order"
                    className="form-control"
                    value={year}
                    onChange={(e) => setYear(e.currentTarget.value)}
                  >
                    <option key="2021" value="2021">
                      2021
                    </option>
                  </select>
                </div>
              </div>
              
              <div class="col-lg-12 col-sm-12">
              <BarTotalRoomAndRevenue year={year} id={id} hotels={hotels}/>
              </div>
                
            </div>
            </div>

            <div class="col-lg-6 col-sm-12">
              <div class="section-title">
                <h4>Number of order by time</h4>
              </div>
              <div class="row align-items-center">
                <div class="col-lg-2 col-sm-2"></div>
                <div class="col-lg-4 col-sm-12 col-md-4">
                  <div class="check-content">
                    <p>From date</p>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      selected={fromDate}
                      className="form-control"
                      selectsStart
                      startDate={fromDate}
                      endDate={toDate}
                      name="From date"
                      onChange={(e) => setFromDate(e)}
                    />
                  </div>
                </div>

                <div class="col-lg-4 col-sm-12">
                  <div class="check-content">
                    <p>To date</p>
                    <DatePicker
                      dateFormat="yyyy-MM-dd"
                      name="To Date"
                      selected={toDate}
                      className="form-control"
                      selectsEnd
                      startDate={fromDate}
                      endDate={toDate}
                      minDate={fromDate}
                      onChange={(e) => setToDate(e)}
                    />
                  </div>
                </div>
                </div>
                
                <div class="col-lg-12 col-sm-12">
                <LineOrderedRoom fromDate={fromDate} toDate={toDate}  id={id} hotels={hotels}/>
                </div>
              
            </div>
            
          </div>
          <hr class="dashed-border" />

          <OrderFilterAgent  id={id} hotels={hotels}/>
        </form>
      </div>
    </body>
  );
};

export default Dashboard;
