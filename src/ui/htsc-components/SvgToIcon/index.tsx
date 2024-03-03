import { Grid } from "@mui/material";

type props = {
  icon: string;
  alt?: string;
};

export default function SvgToIcon({ icon, alt = "" }: props) {
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
