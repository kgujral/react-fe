import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Routes } from "../routes/routes";
import Auth from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const redirectPath = rest.redirectPath || Routes.LOGIN;
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath,
              state: { from: props.location, authError: true }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
