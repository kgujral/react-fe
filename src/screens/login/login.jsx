import React from "react";
import { Redirect } from "react-router-dom";
import Auth from "../../utils/auth";
import { Routes } from "../../routes/routes";
import Side from "./side";
import Heading from "./heading";
import LoginForm from "./login-form";

const Login = ({ history }) => {
  if (Auth.isAuthenticated) {
    return <Redirect to={Routes.HOME} />;
  }
  return (
    <div className="row row-100 h-100 no-margin-no-padding">
      <Side />
      <div className="col-lg-8 col-md-12 col-sm-12 form-content fix-right h-100">
        <Heading />
        <div className="center-relative" style={{ top: "40%" }} id="login">
          <LoginForm history={history} />
        </div>
      </div>
    </div>
  );
};

export default Login;
