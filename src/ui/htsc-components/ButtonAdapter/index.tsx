import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";

import { ButtonAdapterProps } from "./type";

export default function ButtonAdapter(props: ButtonAdapterProps) {
  const {
    variant,
    size,
    disabled,
    backIcon,
    forwardIcon,
    children,
    onClick,
    muiButtonProps
  } = props;
  const theme = useTheme();

  return (
    <Button
      disabled={disabled}
      variant={variant}
      size={size}
      disableRipple
      onClick={(e) => onClick(e)}
      endIcon={forwardIcon ? (theme.direction === "rtl" ? <ChevronLeftIcon /> :<ChevronRightIcon /> ) : null}
      startIcon={backIcon ? (theme.direction === "rtl" ? <ChevronRightIcon />: <ChevronLeftIcon />  ) : null}
      {...muiButtonProps}
    >
      {children}
    </Button>
  );
}
