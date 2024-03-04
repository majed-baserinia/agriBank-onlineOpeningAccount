import { SelectProps } from "@mui/material";
import { ReactNode } from "react";

export type Props = {
  label: string;
  error?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  children: ReactNode[];
  onChange: (value: string) => void;
  muiSelectProps?: SelectProps;
  defaultValue?: string;
};
