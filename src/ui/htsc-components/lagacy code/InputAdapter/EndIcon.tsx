import { Grid } from "@mui/material";

export default function EndIcon({ icon, alt }: endIcon) {
  return (
    <Grid sx={{ width: "24px", height: "24px" }}>
      <img
        style={{ height: "100%" }}
        src={icon}
        alt={alt}
      />
    </Grid>
  );
}
