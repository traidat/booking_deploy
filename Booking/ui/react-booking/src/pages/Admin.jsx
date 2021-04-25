import React from "react";
import AccountFilter from "../component/AccountFilter";
import AllOrder from "../component/AllOrder";
import AdminDashboard from "./AdminDashboard";

const Admin = () => {
  return (
    <body>
      <br />
      <br/>
      <br/>
      <AccountFilter />
      <hr class="dashed-border" />
      <AllOrder/>
      <hr class="dashed-border" />
      <AdminDashboard/>
    </body>
  );
};
export default Admin;
