import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, {AlertColor, AlertProps} from "@mui/material/Alert";
import {ReactNode} from "react";
import {UseFormRegister} from "react-hook-form";
import {createTheme, Slide, useTheme} from "@mui/material";
import useInitialSettingStore from "../../../business/stores/initial-setting-store";
import MaterialThemeProvider from "../../components/MaterialThemeProvider";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
    toastType: AlertColor | undefined;
    message: string | undefined;
    openToast: boolean;
    disappearedSnackbar: (value: boolean) => void;
}

export default function CustomizedSnackbars({
                                                toastType,
                                                disappearedSnackbar,
                                                message = "",
                                                openToast = false,
                                            }: Props) {
    const [open, setOpen] = React.useState(openToast);

    // const settings = useInitialSettingStore((s) => s.setting);

    // const themeTemplate = createTheme({
    //     ...settings.themeConfig,
    //     direction: settings.language === 'fa-IR' ? "rtl" : "ltr",
    //     typography: {
    //         fontFamily: settings.language === 'fa-IR' ? "IRANSans" : "Roboto , sans-serif"
    //     }
    // });
    const theme = useTheme()

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        if (reason === "escapeKeyDown") {
            return;
        }

        setOpen(false);
        disappearedSnackbar(false);
    };

    const handleExited = () => {
        disappearedSnackbar(false);
    };

    return (
        <MaterialThemeProvider>
        <Stack spacing={2} sx={{ maxWidth: 600}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                      TransitionComponent={Slide}   TransitionProps={{ onExited: handleExited }}>
                <Alert onClose={handleClose} severity={toastType} sx={{ width: "100%", wordBreak: "break-all",height:"80px",display:"flex", alignItems:"center" }}>
                    {message}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
        </MaterialThemeProvider>
    );
}