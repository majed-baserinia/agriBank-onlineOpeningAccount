import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Divider, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Props } from "./type";

export default function Menu(props: Props) {
  const { list } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container>
      {list?.map((item, index) => {
        return (
          <>
            <Grid
              container
              justifyContent={"space-between"}
              direction={theme.direction == "rtl" ? "row-reverse" : undefined}
              sx={{ padding: matches ? "16px 0" : "24px 0", cursor: "pointer" }}
              onClick={(e) => {
                item.onClick?.(e);
                item.routeTo && navigate(item.routeTo);
              }}
            >
              <Grid>
                <Grid
                  container
                  direction={theme.direction == "rtl" ? "row-reverse" : undefined}
                  gap={"8px"}
                >
                  <span> {item.icon}</span>
                  <span> {item.title}</span>
                </Grid>
              </Grid>
              <Grid>
                {theme.direction == "rtl" ? (
                  <ArrowBackIosNewIcon />
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </Grid>
            </Grid>
            {!matches ? (
              list.length - 1 == index ? null : (
                <Divider sx={{ width: "calc(100% - 32px)", margin: "auto" }} />
              )
            ) : null}
          </>
        );
      })}
    </Grid>
  );
}
