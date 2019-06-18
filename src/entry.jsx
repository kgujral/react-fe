import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { NotificationContainer } from "react-notifications";
import Loader from "./components/loader";
import Home from "./screens/home/home";
import Login from "./screens/login/login";
import PrivateRoute from "./routes/private-route";
import { SCROLL_TO_TOP } from "./utils/app-util";
import { Routes } from "./routes/routes";
import Auth from "./utils/auth";
import "./css/sass/main.scss";

class Entry extends Component {
  state = { isLoading: true };

  componentDidMount() {
    Auth.init(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader center />;
    }
    return (
      <Router>
        <React.Fragment>
          <Route component={SCROLL_TO_TOP} />
          <Switch>
            <PrivateRoute path={Routes.HOME} component={Home} />
            <Route exact path={Routes.LOGIN} component={Login} />
            <Redirect to={Routes.LOGIN} />
          </Switch>
          <NotificationContainer />
        </React.Fragment>
      </Router>
    );
  }
}

export default Entry;
