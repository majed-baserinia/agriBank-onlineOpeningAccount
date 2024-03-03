import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { Props } from "./type";

export default function BoxAdapter(props: Props) {
  const { children, title } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={0}
      sx={{ height: "100%", borderRadius: matches ? "16px" : "0", padding: "16px" }}
    >
      {matches ? (
        <div style={{ fontSize: "16px", direction: theme.direction, margin: "24px 0" }}>
          {title}
        </div>
      ) : null}
      {children}
    </Paper>
  );
}
