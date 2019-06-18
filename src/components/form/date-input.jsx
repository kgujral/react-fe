import React from "react";
import { asField } from "informed";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

import TextInput from "./text-input";

const limit = (val, max) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = "0" + val;
  }

  if (val.length === max.length) {
    if (Number(val) === 0) {
      val = "01";

      //this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
};

const validDate = (val, dateFormat) => {
  let date = limit(val.substring(0, 2), "31");
  let month = limit(val.substring(2, 4), "12");
  let year = val.substring(4, 8);
  if (dateFormat.indexOf("DD") === -1) {
    month = limit(val.substring(0, 2), "12");
    year = val.substring(2, 6);
  }
  if (dateFormat.indexOf("DD") === -1) {
    return month + (year.length ? "/" + year : "/");
  }
  return (
    date +
    (month.length ? "/" + month : "/  ") +
    (year.length ? "/" + year : "/")
  );
};

const DateInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { setValue } = fieldApi;
  let { dateFormat, ...rest } = props;
  if (!dateFormat) {
    dateFormat = "DD/MM/YYYY";
  }
  const { value } = fieldState;
  const shouldParse = !!value && ("" + value).indexOf("/") === -1;
  const dispValue = shouldParse
    ? moment(value).format(dateFormat)
    : value || "";

  return (
    <CurrencyFormat
      dontUpdate={true}
      value={dispValue}
      customInput={TextInput}
      format={val => {
        return validDate(val, dateFormat);
      }}
      onValueChange={values => {
        const { formattedValue } = values;
        if (
          formattedValue.length === dateFormat.length &&
          moment(formattedValue, dateFormat).isValid()
        ) {
          setValue(
            moment(formattedValue, dateFormat)
              .toDate()
              .getTime()
          );
        }
      }}
      {...rest}
    />
  );
});

export default DateInput;
