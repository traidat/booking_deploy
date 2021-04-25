import React, { useState } from "react";
import AccountDetail from "./AccountDetail";

const AccountFilter = () => {
  const [accountType, setAccountType] = useState("TOURIST");

  return (
    <div class="container">
      <section className="filter-container">
        <div class="section-title">
          <h2>List user</h2>
        </div>
        <div class="row align-items-center">
          <div class="col-lg-5"></div>
          <div class="col-lg-2 col-sm-4">
            <div class="check-content">
              <p>Account Type</p>
              <select
                name="order"
                id="order"
                className="form-control"
                value={accountType}
                onChange={(e) => setAccountType(e.currentTarget.value)}
              >
                <option key="TOURIST" value="TOURIST">
                  TOURIST
                </option>
                <option key="AGENT" value="AGENT">
                  AGENT
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>
      <AccountDetail accountType={accountType}/>
    </div>
  );
};

export default AccountFilter;
