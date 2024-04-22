import { SxProps, TextFieldProps, Theme } from "@mui/material";

export type InputAdapterProps = {
  placeholder?: string;
  disabled?: boolean;
  sx?: SxProps;
  isRequired?: boolean;
  label: string;
  icon?: React.ReactNode;
  type?: "cart" | "money" | "text" | "password" | "number";
  defaultValue?: string;
  onChange: (value: string) => void;
  muiTextFieldProps?: TextFieldProps;
  inputProps?: object;
  error?: boolean;
  success?: boolean;
  size?: Size;
  helperText?: string;
};

type Size = "md" | "lg" | "sm";

export type Styles = {
  theme: Theme;
  success: boolean;
  error: boolean;
  size: Size;
};
