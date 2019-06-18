import React from "react";
import CF from "react-currency-format";

const CurrencyFormat = props => {
  const { value, prefix, ...rest } = props;
  return (
    <CF
      thousandSpacing={"2s"}
      decimalScale={0}
      value={props.value}
      displayType={"text"}
      thousandSeparator={true}
      prefix={prefix !== undefined ? prefix : "₹ "}
      {...rest}
    />
  );
};

export default CurrencyFormat;
