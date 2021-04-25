import React from "react";
import visa from "../assets/img/visa.png";

const AccountNumber = ({ paymentMethod, accountNumber, setAccountNumber }) => {
  if (paymentMethod === "CREDIT_CARD") {
    return (
      <div className="row">
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <label>
              Credit card number
              <span class="required">*</span>
            </label>
            <input
              type="number"
              required
              class="form-control"
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.currentTarget.value);
              }}
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <label>
              <br />
              <span class="required"></span>
            </label>
            <img src={visa} />
          </div>
        </div>
        <div class="col-lg-2 col-md-6">
          <div class="form-group">
            <label>
              MM
              <span class="required">*</span>
            </label>
            <input required min="1" max="12" type="number" class="form-control" />
          </div>
        </div>
        <div class="col-lg-1 col-md-6">
          <div class="form-group">
            <label>
              /<span class="required"></span>
            </label>
            <h2>/</h2>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="form-group">
            <label>
              YY
              <span class="required">*</span>
            </label>
            <input required min="01" max="99" type="number" class="form-control" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <label>
              CVC
              <span class="required">*</span>
            </label>
            <input required type="number" class="form-control" />
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="form-group">
            <label>
              Cardholder name
              <span class="required">*</span>
            </label>
            <input required type="text" class="form-control" />
          </div>
        </div>
      </div>
    );
  }

  return <br />;
};

export default AccountNumber;
