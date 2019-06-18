import React from "react";
import RoleNav from "./role-nav";
import { Routes } from "../../routes/routes";

const SideNav = ({ location }) => {
  return (
    <div className="sidebar flex-c">
      <RoleNav
        to={Routes.COMPANY}
        textKey="nav.company"
        img="/img/build/merchant.svg"
      />
      <RoleNav
        to={Routes.CONFIG}
        textKey="nav.config"
        img="/img/build/business_dash.svg"
      />
    </div>
  );
};

export default SideNav;
