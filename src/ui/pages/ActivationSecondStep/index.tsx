import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Menu from "ui/components/Menu";
import Title from "ui/components/Title";
import BoxAdapter from "ui/htsc-components/BoxAdapter";
import ButtonAdapter from "ui/htsc-components/ButtonAdapter";
import SvgToIcon from "ui/htsc-components/SvgToIcon";
import infoIcon from "../../../assets/icon/info-circle.svg";
import sendAaginIcon from "../../../assets/icon/refresh-alert.svg";
import { menuList } from "../HomePage/menuList";
import Stepper from "ui/htsc-components/Stepper";

export default function ActivationSecondStep() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { t } = useTranslation();

  return (
    <Grid
      container
      sx={{ padding: matches ? "0" : "64px 0" }}
      justifyContent={"center"}
      gap={"24px"}
      dir={theme.direction}
    >
      <Grid
        xs={12}
        md={8}
      >
        <BoxAdapter fullWidth={matches}>
          <Grid
            height={matches ? "calc(100vh - 64px)" : "calc(100vh - 192px)"}
            container
            direction={"column"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <Grid>
              <Title>{t("activationElCheck")}</Title>
              <Stepper list={[t('accountInfo'),t('electroincSignature'),t('end')]} active={1}/>

              <Grid
                container
                flexWrap={"nowrap"}
                gap={"8px"}
              >
                <SvgToIcon
                  icon={infoIcon}
                  alt="info"
                />
                <Typography
                  variant="body1"
                  sx={{ marginBottom: "8px" }}
                >
                  {t("activationSecondStepText")}
                </Typography>
              </Grid>
              <Grid
                container
                alignItems={"baseline"}
              >
                <Typography sx={{ margin: "0 24px" }}>
                  {t("dontRecieveMessage")}
                </Typography>
                <ButtonAdapter onClick={(e) => console.log(e)}>
                  {t("sendAgain")}
                  <span>
                    <SvgToIcon
                      icon={sendAaginIcon}
                      alt="send again"
                    />
                  </span>
                </ButtonAdapter>
              </Grid>
            </Grid>
            <Grid container>
              <ButtonAdapter
                variant="contained"
                size="medium"
                muiButtonProps={{ sx: { width: "100%" } }}
                onClick={(e) => console.log(e)}
              >
                {t("FinalSignatureRegistration")}
              </ButtonAdapter>
            </Grid>
          </Grid>
        </BoxAdapter>
      </Grid>
      {matches ? null : (
        <Grid
          md={3}
          dir={theme.direction}
        >
          <BoxAdapter>
            <Menu list={menuList} />
          </BoxAdapter>
        </Grid>
      )}
    </Grid>
  );
}
