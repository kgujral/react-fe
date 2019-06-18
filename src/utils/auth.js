import Bro from "brototype";
import Api from "./api";
import axios from "axios";
import { AppConstants } from "./app-constants";
import { DEFAULT_ERROR_CALLBACK } from "../utils/app-util";

const Auth = {
  isAuthenticated: false,
  token: "",
  user: {},
  isInit: false,
  config: {},

  init(cb) {
    const token = localStorage.getItem(AppConstants.AUTH_TOKEN_KEY);
    if (token && token !== "undefined") {
      this.token = token;
      Api.defaults.headers.common[AppConstants.AUTH_TOKEN_KEY] = this.token;

      axios
        .all([Api.post("/auth/validate-token"), Api.get("/config")])
        .then(
          axios.spread((resp, config) => {
            this.setData({ token, user: Bro(resp).iCanHaz("data.data") });
            this.setConfig(config.data);
            cb();
            this.isInit = true;
          })
        )
        .catch(err => {
          this.setData({});
          cb();
          this.isInit = true;
        });
    } else {
      Api.get("/config")
        .then(config => {
          this.setConfig(config.data);
          cb();
          this.isInit = true;
        })
        .catch(err => {
          cb();
          this.isInit = true;
        });
    }
  },
  setData(data) {
    const values = Bro(data).iCanHaz(["token", "user"]);
    localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, values[0]);
    localStorage.setItem(AppConstants.USER_KEY, JSON.stringify(values[1]));
    this.token = values[0];
    this.user = values[1];
    this.isAuthenticated = !!values[1];
    Api.defaults.headers.common[AppConstants.AUTH_TOKEN_KEY] = this.token;
  },
  setUser(user) {
    localStorage.setItem(AppConstants.USER_KEY, JSON.stringify(user));
    this.user = user;
  },
  setConfig(config) {
    this.config = config.data;
  },
  authenticate(cb, errorCb) {
    Api.post("/auth/validate-token")
      .then(cb)
      .catch(errorCb);
  },

  login(data, cb, errorCb) {
    Api.post("/auth/login", data)
      .then(resp => {
        this.setData(Bro(resp).iCanHaz("data.data"));
        cb(resp);
      })
      .catch(errorCb);
  },
  logout(cb) {
    const that = this;
    Api.post("/auth/logout")
      .then(() => {
        that.isAuthenticated = false;
        that.setData({});
        localStorage.clear();
        if (cb) {
          cb();
        }
      })
      .catch(DEFAULT_ERROR_CALLBACK);
  }
};

export default Auth;
