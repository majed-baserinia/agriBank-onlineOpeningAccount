import { Paper } from "@mui/material";
import { Props } from "./type";

export default function BoxAdapter(props: Props) {
  const { children, fullWidth, muiPaperProps } = props;

  return (
    <Paper
      elevation={0}
      sx={{ height: "100%", borderRadius: fullWidth ? 0 : "16px", padding: "16px" }}
      {...muiPaperProps}
    >
      {children}
    </Paper>
  );
}
