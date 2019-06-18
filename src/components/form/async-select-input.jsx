import React from "react";
import { asField } from "informed";
import AsyncSelect from "react-select/lib/Async";
import Api from "../../utils/api/api";
import Bro from "brototype";
import { SHOW_ERROR_NOTIFICATION } from "../../utils/api/api-util";

const AsyncSelectInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { setValue } = fieldApi;
  const {
    options,
    placeholder,
    url,
    formApiZ,
    dataKey = "name",
    parentVal,
    showError,
    ...rest
  } = props;
  const transform = data => {
    let arr = [];
    for (let i = 0; i < Math.min(10, data.length); i++) {
      arr[i] = {
        label: data[i][dataKey],
        value: data[i][dataKey],
        state: data[i].state,
        isServiceAvailable: data[i].isServiceAvailable
      };
    }
    return arr;
  };

  let selectedVal = null;
  if (fieldState.value) {
    selectedVal = { label: fieldState.value, value: fieldState.value };
  }

  const loadOptions = (inputValue, callback) => {
    Api.get(
      url + "?token=" + (inputValue || Bro(selectedVal).iCanHaz("label") || "a")
    ).then(resp => {
      callback(transform(resp.data.data));
    });
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedVal}
      onChange={option => {
        if (formApiZ && dataKey === "city") {
          if (showError && !option.isServiceAvailable) {
            const msg =
              "Sorry, we're not in this city. Do you have another address?";
            SHOW_ERROR_NOTIFICATION(msg);
          }
          formApiZ.setValue("state", option.state);
        }
        setValue(option.label);
      }}
      className="onboarding-select"
      placeholder={placeholder || "Select One"}
      theme={theme => ({
        ...theme,
        border: 0,
        color: "#000",
        colors: {
          ...theme.colors,
          primary25: "#8d288c29",
          primary: "#8d288c"
        }
      })}
      {...rest}
    />
  );
});

export default AsyncSelectInput;
