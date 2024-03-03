import { FormControlLabel, Radio, useTheme } from "@mui/material";
import { Props } from "./types";

export default function RadioButtonAdapter(props: Props) {
  const { value, label, checked, onChange, disabled } = props;
  const theme = useTheme();


  return (
    <FormControlLabel
      sx={{
        direction: theme.direction,
        padding: "8px",
        border: checked
          ? `2px solid ${theme.palette.primary.main}`
          : `2px solid ${theme.palette.grey[200]}`,
        borderRadius: "16px"
      }}
      disabled={disabled}
      value={value}
      control={
        <Radio
          checked={checked}
          onChange={onChange}
        />
      }
      label={label}
      labelPlacement="end"
    />
  );
}
