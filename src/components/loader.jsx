import React from "react";
import { ClipLoader } from "react-spinners";
import { AppConstants } from "../utils/app-constants";

const centerCss = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const Loader = props => {
  const { center, styles, ...rest } = props;
  const css = center ? centerCss : styles || {};
  return (
    <ClipLoader color={AppConstants.THEME.PRIMARY_COLOR} css={css} {...rest} />
  );
};

export default Loader;
