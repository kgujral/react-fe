import React from "react";
import { asField } from "informed";

const Input = asField(({ fieldState, fieldApi, ...props }) => {
  const {
    onChange,
    onBlur,
    onFocus,
    hideTick,
    inlineImgStyle,
    inlineErrorStyle,
    initialValue,
    forwardedRef,
    dontUpdate,
    className,
    ...rest
  } = props;
  const { error, value, touched } = fieldState;
  const { setValue, setTouched } = fieldApi;
  let ref = {};
  return (
    <div style={{ position: "relative" }}>
      <input
        ref={refer => {
          ref = refer;
        }}
        className={className || "login"}
        value={value || ""}
        {...rest}
        onChange={e => {
          if (onChange) {
            onChange(e, e.target.value);
          }
          if (!dontUpdate) {
            setValue(e.target.value);
          }
        }}
        onBlur={e => {
          setTouched();
          if (onBlur) {
            onBlur(e);
          }
        }}
        onFocus={e => {
          setTouched(false);
          if (onFocus) {
            onFocus(e);
          }
        }}
      />
      {touched && error && (
        <span
          onClick={() => {
            ref.focus();
          }}
          className="no-fill-warning"
          style={inlineErrorStyle}
        >
          {error}
        </span>
      )}
      {touched && error && !hideTick && (
        <img
          src="/img/build/error.svg"
          alt=""
          className="onboarding-fill"
          style={inlineImgStyle}
        />
      )}
      {touched && value && !error && !hideTick && (
        <img
          src="/img/build//tick.svg"
          alt=""
          className="onboarding-fill"
          style={inlineImgStyle}
        />
      )}
    </div>
  );
});

export default Input;
