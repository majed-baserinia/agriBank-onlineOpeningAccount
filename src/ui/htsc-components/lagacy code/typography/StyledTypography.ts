import {Typography } from "@mui/material";
import { styled } from "@mui/material/styles";


export const MatTypography = styled(Typography )(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
    PaddingBottom:"3em !important",
    margin:"0.5em !important",
      color: `${theme.palette.secondary.main} !important`,

}));
