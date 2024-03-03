import { Center } from "@chakra-ui/react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { clearAlert, useAlert } from "business/stores/AppAlertsStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
//import Button from "ui/htsc-components/buttons/button/Button";

import AlertIcon from "./alertIcon";
import { AppAlert } from "./type";

export default function AppAlerts() {
  const { alerts } = useAlert();
  const theme = useTheme();
  const { t } = useTranslation();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(true);
  const [localAlerts, setLocalAlerts] = useState<AppAlert[]>([]);
  const capturedAlert = localAlerts[0];

  useEffect(() => {
    setLocalAlerts([...alerts]);
    if (alerts.length) {
      setOpen(true);
    }
  }, [alerts]);

  const mappedType =
    capturedAlert?.type === "errorWithConfirmation"
      ? "error"
      : capturedAlert?.type === "warningWithConfirmation"
        ? "warning"
        : capturedAlert?.type;

  // const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpen(false);
  //   clearApiError();
  // };

  //    const mobileView = (
  //   <Snackbar
  //   open={open}
  //   autoHideDuration={4000}
  //   onClose={handleClose}
  //   anchorOrigin={{ vertical: "top", horizontal: "center" }}
  // >
  //   <Alert
  //     onClose={handleClose}
  //     severity="error"
  //     variant="filled"
  //     sx={{ width: "100%" }}
  //   >
  //     test
  //     {err[0].detail}
  //   </Alert>
  // </Snackbar>
  //    );

  //   const desktopView = <></>;

  capturedAlert?.type === "errorWithConfirmation" ||
  capturedAlert?.type === "warningWithConfirmation"
    ? capturedAlert.actions?.onConfirm?.()
    : null;
  return localAlerts.length > 0 ? (
    <Dialog
      onClose={(e) => {
        setOpen(false);
        clearAlert();
        setLocalAlerts([]);
        capturedAlert?.actions?.onCloseModal && capturedAlert?.actions?.onCloseModal();
      }}
      open={open}
      PaperProps={{
        sx: { padding: "32px", borderRadius: "24px" }
      }}
      maxWidth={"xs"}
      fullWidth
    >
      <Center>
        <AlertIcon type={mappedType} />
      </Center>
      <DialogTitle sx={{ margin: "auto" }}>{t(mappedType)}</DialogTitle>

      <DialogContent sx={{ margin: "auto" }}>
        <DialogContentText>{capturedAlert?.messageText}</DialogContentText>
      </DialogContent>

      {/* <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
            clearAlert();
            setLocalAlerts([]);
            capturedAlert?.actions?.onClick?.();
          }}
          variant={"contained"}
          text={t("Irealized")}
        ></Button>
        {capturedAlert?.type === "errorWithConfirmation" ||
        capturedAlert?.type === "warningWithConfirmation" ? (
          <Button
            onClick={() => {
              setOpen(false);
              clearAlert();
              setLocalAlerts([]);
              capturedAlert.actions?.onConfirm?.();
            }}
            variant={"contained"}
            text={t("Irealized")}
          ></Button>
        ) : null}
      </DialogActions> */}
    </Dialog>
  ) : undefined;
}
