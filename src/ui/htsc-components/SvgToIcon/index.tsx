import { Grid } from "@mui/material";

type props = {
  icon: string;
  alt?: string;
};

export default function SvgToIcon({ icon, alt = "" }: props) {
  return (
    <Grid sx={{ width: "24px", height: "24px", flexShrink: 0 }}>
      <img
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        src={icon}
        alt={alt}
      />
    </Grid>
  );
}
