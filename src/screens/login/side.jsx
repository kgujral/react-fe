import React from "react";
import { t } from "../../utils/i18n";

const Side = () => {
  return (
    <div className="col-lg-4 col-md-12 col-sm-12 side-fix fix-left">
      <div className="side-content">
        <p>
          {t("login.hello")}
          <br />
          {t("login.greeting")}
        </p>
      </div>
    </div>
  );
};

export default Side;
