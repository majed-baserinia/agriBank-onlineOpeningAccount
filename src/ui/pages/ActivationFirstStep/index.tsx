import fluentValidationResolver from "@Fluentvalidator/extentions/fluentValidationResolver";
import {
  Grid,
  MenuItem,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import ActivationCommand from "business/application/cheque/activationFirstStep/activationCommand";
import { useState } from "react";
import { Controller, useController, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Menu from "ui/components/Menu";
import Title from "ui/components/Title";
import BoxAdapter from "ui/htsc-components/BoxAdapter";
import ButtonAdapter from "ui/htsc-components/ButtonAdapter";
import RadioButtonAdapter from "ui/htsc-components/RadioButtonAdapter";
import SelectAdapter from "ui/htsc-components/SelectAdapter";
import { menuList } from "../HomePage/menuList";
import Stepper from "ui/htsc-components/Stepper";

export default function ActivationFirstStep() {
  const { t } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState("1");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

 const {
    control,
    handleSubmit,
    formState: { errors: AccountChargeInquiryerror, isValid }
  } = useForm<ActivationCommand>({
    resolver: (values, context, options) => {
      return fluentValidationResolver(values, context, options);
    },
    context: ActivationCommand
  });

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
        <BoxAdapter fullWidth={matches} >
         
          <Grid
            minHeight={matches ? "calc(100vh - 64px)" : "calc(100vh - 192px)"}
            container
            direction={"column"}
            justifyContent={"space-between"}
            wrap="nowrap"
          >
            <Grid>
              <Title>{t("activationElCheck")}</Title>
             { !matches ? <Stepper list={[t('accountInfo'),t('electroincSignature'),t('end')]} active={0}/> : null}
              <Typography
                variant="body1"
                sx={{ marginBottom: "8px" }}
              >
                {t("activationFirstStepText")}
              </Typography>
              <RadioGroup
                dir={theme.direction}
                name="whoToActivate"
                value={value}
                onChange={handleRadioChange}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: matches ? "100%" : "75%"
                }}
              >
                <RadioButtonAdapter
                  value="1"
                  label={t("activateForMe")}
                  onChange={handleRadioChange}
                  checked={value == "1"}
                />
                <RadioButtonAdapter
                  value="2"
                  label={t("activateForCompany")}
                  onChange={handleRadioChange}
                  checked={value == "2"}
                />
              </RadioGroup>
              {value == "2" ? (
                <Grid
                  sx={{ marginTop: "48px", marginBottom:"48px" }}
                  sm={12}
                  md={9}
                >
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: "8px" }}
                  >
                    {t("selectACompany")}
                  </Typography>
                  <Controller
                    control={control}
                    name="SourceCard"
                    render={({ field }) => {
                      return (
                        <SelectAdapter
                          label={t("companyList")}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                          defaultValue={"10"}
                        >
                          <MenuItem value={10}>q</MenuItem>
                          <MenuItem value={11}>d</MenuItem>
                        </SelectAdapter>
                      );
                    }}
                  />
                </Grid>
              ) : null}
            </Grid>
            <Grid container>
              <ButtonAdapter
                variant="contained"
                size="medium"
                muiButtonProps={{ sx: { width: "100%" } }}
                forwardIcon
                onClick={handleSubmit((e) => console.log(e))}
              >
                {t("continue")}
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
