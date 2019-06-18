import React from "react";
import Auth from "../../utils/auth";
import { Routes } from "../../routes/routes";
import { t } from "../../utils/i18n";

const Header = ({ history }) => {
  return (
    <header className="logged-in">
      <div
        className="wrapper_1126"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="logo col-9">
          <img
            className="show-when-not-fixed"
            src="https://via.placeholder.com/120x32"
            alt=""
          />
          <img
            className="show-when-fixed"
            src="https://via.placeholder.com/120x32"
            alt=""
          />
        </div>
        <div className="col-3" style={{ textAlign: "right", marginTop: 27 }}>
          <button
            className="secondary smaller nude"
            onClick={() => {
              Auth.logout(() => {
                history.replace(Routes.LOGIN);
              });
            }}
          >
            {t("logout.key")}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
