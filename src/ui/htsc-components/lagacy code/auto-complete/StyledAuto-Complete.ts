import { Autocomplete, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MatInputLabel = styled(InputLabel)(({ theme, shrink }) => ({
  "&.MuiInputLabel-shrink": {
    backgroundColor: `${theme.palette.background.paper} !important`,
    paddingLeft: "8px !important",
    paddingRight: "8px !important",
    fontSize: "0.9em !important",
    top: "auto"
  },
  color: `${theme.palette.grey[300]} !important`,
  fontFamily: theme.typography.fontFamily,
  // fontSize: "0.8em !important",
  fontSize:'14px',
  [theme.breakpoints.down("sm")]: {
    fontSize:'12px'
  },
  fontWeight: "bold !important",
  top: "5px !important"
}));

export const MatAutoComplete = styled(Autocomplete)(({ theme }) => ({
  //backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  minWidth: 120,
  "& .MuiSelect-select": {
    paddingRight: theme.spacing(2)
  },
  "& .MuiSelect-icon": {
    right: 0,
    top: "50%",
    transform: "translateY(-50%)"
  }
}));
export const MatOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  "Mui-focused fieldset": {
    borderColor: `${theme.palette.primary} !important`
  },
  ":hover fieldset": {
    borderColor: `${theme.palette.primary} !important`
  },
  "MuiInput-underline:after": {
    borderColor: `${theme.palette.primary} !important`
  },
  "label.Mui-focused": {
    color: `${theme.palette.primary} !important`
  },
  "MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: `${theme.palette.primary} !important`
    },
    "& fieldset": {
      borderColor: `${theme.palette.primary} !important`
    }
  }
}));

export const MatMenuItem = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  padding: "5px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }
}));
