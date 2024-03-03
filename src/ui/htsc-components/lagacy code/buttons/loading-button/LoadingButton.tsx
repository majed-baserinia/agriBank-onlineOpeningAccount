import { LoadingButtonProps as MuiLoadingButtonProps } from "@mui/lab";
import React from "react";
import MaterialThemeProvider from "ui/components/MaterialThemeProvider";
import { variant } from "../countdown-timer/CountDownTimerButton";
import { MatLoadingButton, MatLoadingButtonOutline } from "./StyledLoadingButton";

type LoadingButtonProps = {
  buttonVariant?: variant | undefined
  className?: string;
} & Omit<MuiLoadingButtonProps, "classes">;

function LoadingButton(props: LoadingButtonProps) {
  return (
    <MaterialThemeProvider>
      {props?.buttonVariant === variant.outlined ? <MatLoadingButtonOutline
        fullWidth
        
        classes={{
          root: `disabled:!cursor-not-allowed disabled:!bg-green-900 disabled:!pointer-events-auto ${props.className ?? ""
            }`
        }}
        variant='outlined'
        {...props}
      ></MatLoadingButtonOutline> : <MatLoadingButton
      
        fullWidth
        classes={{
          root: `disabled:!cursor-not-allowed disabled:bg-primary disabled:!pointer-events-auto ${props.className ?? ""
            }`
        }}
variant='contained'
        {...props}
      ></MatLoadingButton>}
    </MaterialThemeProvider>
  );
}

export default LoadingButton;
