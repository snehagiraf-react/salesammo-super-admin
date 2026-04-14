import React from "react";
import "../../assets/styles/button.css";

const Button = ({ children, onClick }) => {
  const isCancel = typeof children === "string" && children.toLowerCase() === "cancel";

  return (
    <button
      className={isCancel ? "CancelButton" : "CommonButton"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;