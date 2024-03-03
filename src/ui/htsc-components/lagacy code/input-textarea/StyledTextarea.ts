import { FormHelperText, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";


export const MatInputLabel = styled(InputLabel)(({ theme, shrink }) => ({
  color: `${theme.palette.secondary.dark} !important`,
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.9em !important",
  fontWeight: "bold !important",
  top: "5px !important",
  left: shrink ? "0px" : "30px",
  "&.MuiInputLabel-shrink": {
    backgroundColor: `${theme.palette.background.default} !important`,
    paddingLeft: "8px !important",
    paddingRight: "8px !important"
  }
}));

export const MatOutlinedTextarea = styled( TextField)(({ theme }) => ({
 fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  "Mui-focused fieldset": {
    borderColor: `${theme.palette.secondary.dark} !important`
  },
  ":hover fieldset": {
    borderColor: `${theme.palette.secondary.dark} !important`
  },
  "MuiInput-underline:after": {
    borderColor: `${theme.palette.secondary.dark} !important`
  },
  "label.Mui-focused": {
    color: `${theme.palette.secondary.dark} !important`
  },
  "MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: `${theme.palette.secondary.dark} !important`
    },
    "& fieldset": {
      borderColor: `${theme.palette.secondary.light} !important`
    }
   }
}));

export const MatFormHelperText = styled(FormHelperText)(({ theme }) => ({
  color: `${theme.palette.error.main}  !important`,
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.8em !important",
  fontWeight: "bold !important",
  opacity: "0.6 !important"
}));
