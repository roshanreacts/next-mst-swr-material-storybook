import * as React from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";

export default function MuiButton({
  variant = "contained",
  color = "primary",
  label = "Button",
  ...props
}) {
  return (
    <Button {...props} variant={variant} color={color}>
      {label}
    </Button>
  );
}
