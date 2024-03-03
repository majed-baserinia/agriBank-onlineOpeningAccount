import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const MatButton = styled(Button)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary} !important`,
  fontFamily: theme.typography.fontFamily,
  color: `${theme.palette.info.contrastText} !important`,
  borderRadius: "10px",
  fontSize: "14px",
  height: "45px",
 // fontWeight: "bold !important",
  ":hover": {
    backgroundColor: `${theme.palette.error} !important`
  }
}));
