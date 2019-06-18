import React from "react";
import { asField } from "informed";
import Select from "react-select";
import { SHOW_ERROR_NOTIFICATION } from "../../utils/api/api-util";

const SelectInput = asField(({ fieldState, fieldApi, ...props }) => {
  const { setValue } = fieldApi;
  const { options, placeholder, onChange, showError, ...rest } = props;
  let selectedVal = null;
  if (fieldState.value) {
    selectedVal = options.filter(option => option.value === fieldState.value);
  }
  return (
    <Select
      value={selectedVal}
      onChange={option => {
        if (showError) {
          if (!option.isActive) {
            SHOW_ERROR_NOTIFICATION(
              "Verification is still pending for this account."
            );
            return;
          }
        }
        setValue(option && option.value);
        if (onChange) {
          onChange(option.value);
        }
      }}
      options={options}
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

export default SelectInput;
