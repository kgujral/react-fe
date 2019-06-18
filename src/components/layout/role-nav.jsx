import React from "react";
import { NavLink } from "react-router-dom";
import Bro from "brototype";
import Auth from "../../utils/auth";
import { t } from "../../utils/i18n";

const RoleNav = props => {
  const userRoles = Bro(Auth).iCanHaz("user.roles");
  const { roles = [], textKey, img, ...rest } = props;
  if (roles && roles.length && !userRoles) {
    return null;
  }
  const intersection = roles.filter(value => userRoles.includes(value));
  if (roles && roles.length && !intersection.length) {
    return null;
  }
  return (
    <NavLink
      {...rest}
      activeClassName="tab-active"
      className="tabs flex-c"
      exact
    >
      <img src={img} alt="" />
      <span>{t(textKey)}</span>
    </NavLink>
  );
};

export default RoleNav;
