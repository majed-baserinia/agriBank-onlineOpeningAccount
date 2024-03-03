interface InputAdapterProps {
  placeholder?: string;
  disabled?: boolean;
  sx?: object;
  isPassword?: boolean;
  isRequired?: boolean;
  label: string;
  icon?: React.ReactNode;
  type?: "cart" | "money";
  defaultValue?: string;
  onChange: (...event: ChangeEvent) => void;
  textFieldProps?: object;
  inputProps?: object;
  error?: boolean;
  success?: boolean;
  size?: Size;
  helperText?: string
}

interface endIcon {
  icon: string;
  alt: string;
}

type Size = "md" | "lg" | "sm";

interface StyelHook {
  theme: Theme;
  success: boolean;
  size: Size;
}
