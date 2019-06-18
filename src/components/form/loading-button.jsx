import React from "react";
import Loader from "../../utils/loader";

const LoadingButton = props => {
  const { title, isLoading, size = 25, ...rest } = props;
  if (isLoading) {
    return (
      <div className="loader-container" style={props.style}>
        <Loader size={size} />
      </div>
    );
  }
  return <button {...rest}>{title}</button>;
};

export default LoadingButton;
