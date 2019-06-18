import React from "react";
import Header from "../../components/layout/header";
import SideNav from "../../components/layout/sidenav";
import Company from "../company/company";
import Config from "../config/config";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../../routes/routes";

const Home = ({ history, location }) => {
  return (
    <div className="container-custom dashboard">
      <Header history={history} />
      <SideNav location={location} />
      <section key={location.key} className="mir">
        <div
          className="flex-c main-side container-fluid"
          style={{ padding: 0 }}
        >
          <Switch>
            <Route exact path={Routes.COMPANY} component={Company} />
            <Route exact path={Routes.CONFIG} component={Config} />
            <Redirect to={Routes.COMPANY} />
          </Switch>
        </div>
      </section>
    </div>
  );
};

export default Home;
