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
import { ReactElement, ReactNode, SyntheticEvent, useState } from "react";
import { Props } from "./type";

export default function SelectAdapter(props: Props) {
  const {
    onChange,
    label,
    error,
    disabled,
    icon,
    children,
    defaultValue = "",
    muiSelectProps
  } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const handleChange = (e: SelectChangeEvent<unknown>, child: ReactNode) => {
    if ((child as ReactElement).type == "div") {
      setOpen(true);
    } else {
      console.log(e);
      console.log(child);

      setSelectedValue(e.target.value as string);
      onChange(e.target.value as string);
    }
  };

  const handleClickedItem = (e: SyntheticEvent<Element, Event>) => {
    
    //check if the user is clicking on buttons  inside the select
    const clickedItemTagName = e.currentTarget.tagName.toLowerCase();
    const clickedItemClassName = e.currentTarget.className;

    if (clickedItemTagName == "div" && clickedItemClassName === "clickedNotClose") {
      setOpen(true);
    } else {
      setOpen(false);
    }
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
        <InputLabel id="label">{label}</InputLabel>
        <Select
          labelId="label"
          {...muiSelectProps}
          disabled={disabled}
          dir={theme.direction}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={(e) => handleClickedItem(e)}
          value={selectedValue}
          label={label}
          onChange={handleChange}
          sx={{ "& .MuiSvgIcon-root": { color: theme.palette.grey[400] } }}
          IconComponent={KeyboardArrowDownIcon}
          error={error}
          startAdornment={
            icon ? <InputAdornment position="start">{icon}</InputAdornment> : undefined
          }
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
