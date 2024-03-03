import { InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { styled } from "@mui/material/styles";


export const MatInputLabel = styled(InputLabel)(({ theme, shrink }) => ({
  color: `${theme.palette.secondary.dark} !important`,
  fontFamily: theme.typography.fontFamily,
  fontSize: "0.8em !important",
  fontWeight: "bold !important",
}));
export const MatSelect = styled(Select)(({ theme }) => ({
  
 // backgroundColor: theme.palette.primary.light,
 borderRadius: theme.shape.borderRadius,
 minWidth: 120,
 '& .MuiSelect-select': {
     paddingRight: theme.spacing(3),
 },
 '& .MuiSelect-icon': {
     right: 0,
     top: '50%',
     transform: 'translateY(-50%)',
 },
}));

export const MatOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  "Mui-focused fieldset": {
    borderColor: `${theme.palette.background.paper} !important`
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

export const MatMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  borderRadius: theme.shape.borderRadius,
  padding: "5px",
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
    
  }
}));
