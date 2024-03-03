import { FormHelperText, InputLabel, OutlinedInput } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MatInputLabel = styled(InputLabel)(({ theme, shrink }) => {
  return {
    color: `${theme.palette.grey[500]} !important`,
    fontFamily: theme.typography.fontFamily,
    fontSize: "14px",
    top: "5px !important",
    // left: shrink ? "0px" : "30px",
    "&.MuiInputLabel-shrink": {
      backgroundColor: `${theme.palette.background.default} !important`,
      paddingLeft: "8px !important",
      paddingRight: "8px !important",
      marginRight: "10px"
    }
  };
});

export const MatOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: "14px",
  borderRadius: "8px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px"
  },
  color: theme.palette.grey[500],
  "Mui-focused fieldset": {
    borderColor: `${theme.palette.primary.main} !important`
  },
  ":hover fieldset": {
    borderColor: `${theme.palette.primary.main} !important`
  },
  "MuiInput-underline:after": {
    borderColor: `${theme.palette.primary.main} !important`
  },
  "label.Mui-focused": {
    color: `${theme.palette.primary.main} !important`
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
 // fontSize: "0.8em !important",
 // fontWeight: "bold !important",
 // opacity: "0.6 !important"
}));
export const MatInputLabel_StartAdornment = styled(InputLabel)(({ theme, shrink }) => ({
  color: `${theme.palette.secondary.dark} !important`,
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.8em !important",
  fontWeight: "bold !important",
  top: "13px !important",
  left: shrink ? "0px" : "30px",
  "&.MuiInputLabel-shrink": {
    backgroundColor: `${theme.palette.background.default} !important`,
    paddingLeft: "8px !important",
    paddingRight: "8px !important"
  }
}));
