import CheckIcon from "@mui/icons-material/Check";
import { Chip, useTheme } from "@mui/material";
import CounterIcon from "./CounterIcon";
import { Props } from "./type";

export default function ChipAdapter(props: Props) {
  const {
    label,
    size = "medium",
    onClick,
    checked = false,
    color = "default",
    count
  } = props;
  const theme = useTheme();

  const sx = {
    backgroundColor: checked ? theme.palette.primary[50] : undefined,
    border: `1px solid ${theme.palette.primary[50]}`,
    "&&:hover": {
      backgroundColor: checked ? theme.palette.primary[50] : "transparent",
      border: `1px solid ${
        checked ? theme.palette.primary.main : theme.palette.grey[200]
      }`
    },
    ".MuiChip-outlined": {
      "& :hover": {
        border: "1px solid red"
      }
    },
    ".MuiChip-icon": {
      margin: "0 5px"
    },
    ".MuiChip-label": {
      marginTop: "2px"
    },
    "& .MuiChip-deleteIcon": {
      margin: "0 5px"
    }
  };

  return (
    <Chip
      clickable
      color={color}
      dir={theme.direction === "ltr" ? "rtl" : "ltr"}
      size={size}
      label={label}
      variant="outlined"
      onClick={(e) => onClick(e)}
      onDelete={count ? () => {} : undefined}
      deleteIcon={count ? <CounterIcon count={count} /> : undefined}
      sx={sx}
      icon={
        checked ? (
          <CheckIcon
            color="primary"
            sx={{ width: "20px", height: "20px", margin: "0" }}
          />
        ) : undefined
      }
    />
  );
}
