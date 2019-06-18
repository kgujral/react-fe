import React from "react";

const FormRow = ({ children }) => {
  return (
    <div className="row m-16">
      <div className="offset-1 col-6">{children}</div>
    </div>
  );
};

export default FormRow;
