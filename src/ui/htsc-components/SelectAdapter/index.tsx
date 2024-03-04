import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Props } from "./type";

export default function SelectAdapter(props: Props) {
  const { onChange, label, error, disabled, icon, children,defaultValue, muiSelectProps } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
    setSelectedValue(e.target.value as string);
    onChange(e.target.value as string);
  };

  const gridStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "9",
    padding: "16px",
    height: window.innerHeight + "px",
    backgroundColor: theme.palette.background.paper
  };

  const menuStyle = {
    "& .MuiMenu-list": {
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      width: "100%",
      boxShadow: "none"
    },
    "& .MuiMenu-paper": {
      backgroundColor: theme.palette.background.paper,
      height: "100%",
      width: "100%",
      boxShadow: "none"
    }
  };
  return (
    <Grid
      container
      flexDirection={"column"}
      justifyContent={"space-between"}
      sx={open && matches ? { ...gridStyle } : null}
    >
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          {...muiSelectProps}
          disabled={disabled}
          dir={theme.direction}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={selectedValue}
          label={label}
          onChange={handleChange}
          sx={{ "& .MuiSvgIcon-root": { color: theme.palette.grey[400] } }}
          IconComponent={KeyboardArrowDownIcon}
          error={error}
          startAdornment={<InputAdornment position="start">{icon}</InputAdornment>}
          MenuProps={{
            dir: theme.direction,
            sx: matches ? menuStyle : null
          }}
        >
          {children}
        </Select>
      </FormControl>
    </Grid>
  );
}
