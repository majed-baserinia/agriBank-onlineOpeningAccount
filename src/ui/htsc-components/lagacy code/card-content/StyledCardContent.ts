import {Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MatCardContent = styled(Paper )(({ theme }) => ({
  backgroundColor: "#DEE2DA!important",
  fontFamily: theme.typography.fontFamily,
  color: `${theme.palette.secondary.main} !important`,
  fontSize: "0.9em !important",
  paddingTop:"2em !important",
  height:"20em !important"
}));
