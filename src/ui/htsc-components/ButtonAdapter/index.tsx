import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import { ButtonAdapterProps } from "./type";

export default function ButtonAdapter(props: ButtonAdapterProps) {
  const { variant, size, disabled, backIcon, forwardIcon, children, muiButtonProps } =
    props;

  return (
    <Button
      disabled={disabled}
      variant={variant}
      size={size}
      disableRipple
      //TODO check for the direction from i18 if needed
      endIcon={forwardIcon ? <ChevronRightIcon /> : null}
      startIcon={backIcon ? <ChevronLeftIcon /> : null}
      {...muiButtonProps}
    >
      {children}
    </Button>
  );
}
