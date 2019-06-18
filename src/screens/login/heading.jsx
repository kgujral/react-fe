import React from "react";
import { t } from "../../utils/i18n";

const Heading = () => {
  return (
    <div className="family">
      <img src="https://via.placeholder.com/60x60" alt="" />
      <h2>{t("login.heading")}</h2>
    </div>
  );
};

export default Heading;
