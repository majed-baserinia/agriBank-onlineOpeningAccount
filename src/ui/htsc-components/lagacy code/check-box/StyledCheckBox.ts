import {    Checkbox, FormControl, FormControlLabel, FormGroup } from "@mui/material";
import { styled } from "@mui/material/styles";


export const MatCheckbox= styled(Checkbox)(({ theme }) => ({
   fontFamily: theme.typography.fontFamily,
  fontSize: "0.9em !important",
  PaddingBottom:"4em !important",
  paddingRight:"2em !important",
  color:`${theme.palette.secondary.main} !important`
}));
export const MatFormControlLabel= styled(FormControlLabel)(({ theme }) => ({
   fontFamily: theme.typography.fontFamily,
  fontSize: "0.9em !important",
  PaddingBottom:"4em !important",
  color: `${theme.palette.secondary.main} !important`,
  marginRight:"0px !important"

}));

export const MatFormGroup= styled(FormGroup)(({ theme }) => ({
   fontFamily: theme.typography.fontFamily,
  fontSize: "0.9em !important",
  PaddingBottom:"4em !important",
  color: "#003832 !important",
}));

export const MatFormControl= styled(FormControl)(({ theme }) => ({
   fontFamily: theme.typography.fontFamily,
  fontSize: "0.9em !important",
  PaddingBottom:"4em !important",
  color: `${theme.palette.secondary.main} !important`,
  marginTop:"30px !important"
}));
