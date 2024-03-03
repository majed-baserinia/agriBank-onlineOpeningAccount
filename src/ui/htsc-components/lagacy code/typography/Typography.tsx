import * as React from "react";
import MaterialThemeProvider from "ui/components/MaterialThemeProvider";
import { MatTypography } from "./StyledTypography";
interface props {
  variant: any;
  text: string;
  className: string;
}

export default function Typography({ variant, text ,className}: props) {
  return (
    <MaterialThemeProvider >
      <MatTypography variant={variant} className={className}>{text}</MatTypography>
    </MaterialThemeProvider>
  );
}
