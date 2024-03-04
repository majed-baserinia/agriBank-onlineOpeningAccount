import { ButtonProps } from "@mui/material";
import { ReactNode } from "react";

export type ButtonAdapterProps = {
  variant?: "text" | "contained" | "outlined";
  size?: Size;
  disabled?: boolean;
  backIcon?: boolean;
  forwardIcon?: boolean;
  children?: ReactNode | ReactNode[];
  muiButtonProps?: ButtonProps;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

type Size = "medium" | "large" | "small";
