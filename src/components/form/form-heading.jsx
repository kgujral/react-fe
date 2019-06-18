import React from "react";
import { t } from "../../utils/i18n";

const FormHeading = ({ text, textKey }) => {
  return (
    <div className="row">
      <div className="offset-1 col-6">
        <p
          style={{
            fontFamily: "Lato-Regular, sans-serif",
            fontSize: 24,
            color: "#0D0D0D"
          }}
        >
          {text || t(textKey)}
        </p>
      </div>
    </div>
  );
};

export default FormHeading;
