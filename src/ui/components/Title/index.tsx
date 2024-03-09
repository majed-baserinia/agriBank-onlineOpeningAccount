import { useTheme } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export default function Title(props: { children: ReactNode }) {
  const { children } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <h1
      dir={theme.direction}
      style={{ fontSize: "16px", fontWeight: "700" , marginBottom: '24px'}}
    >
      {children}
    </h1>
  );
}
