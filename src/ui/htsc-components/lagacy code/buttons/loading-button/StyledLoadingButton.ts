import { Margin } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";

export const MatLoadingButton = styled(LoadingButton)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary} !important`,
  fontFamily: theme.typography.fontFamily,
  color: `${theme.palette.info.contrastText} !important`,
  fontSize: "0.9em !important",
  //fontWeight: "bold !important",
  borderRadius: "16px",
  height: "48px"
}));

export const MatLoadingButtonOutline = styled(LoadingButton)(({ theme }) => ({
  // backgroundColor: `${theme.palette.secondary.dark} !important`,
  fontFamily: theme.typography.fontFamily,
 // color: `${theme.palette.info.contrastText} !important`,
  ":disabled": {
    color: `${theme.palette.text.primary} !important`
  },
  fontSize: "14px !important",
  //fontWeight: "bold !important",
  borderRadius: "16px",
  height: "48px",
}));
