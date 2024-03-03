import useInitPostMessage from "business/hooks/postMessage/useInitPostMessage";
import { changeLanguage } from "i18next";
import { memo, useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import MaterialThemeProvider from "ui/components/MaterialThemeProvider";
import AppAlerts from "ui/htsc-components/alerts/AppAlerts";
import Loader from "ui/htsc-components/loader/Loader";
import themeInitializer from "ui/theme-config/baseTheme";
import ApiConfigSingleton from "../../business/stores/api-config-singleton";
import useInitialSettingStore, {
  InitialSetting
} from "../../business/stores/initial-setting-store";

const Layout = () => {
  const [initData] = useInitPostMessage();
  const { settings, setSettings } = useInitialSettingStore((s) => s);
  const [configReady, seConfigReady] = useState(false);

  const GlobalStyle = createGlobalStyle`
      html, body {
        direction: ${settings.language === "fa-IR" ? "rtl" : "ltr"};
        font-family: ${
          settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
        };
      }
    `;

  const getConfig = useCallback(async () => {
    try {
      const res = await fetch("/cheque/api-config.json");
      const apiConf = await res.json();
      ApiConfigSingleton.initiateApiConfig(apiConf?.apiBaseUrl);

      //read lang and theme from query string
      const urlParams = new URLSearchParams(window.location.search);
      const language = urlParams.get("Lang");
      const themeName = urlParams.get("Theme");

      //get the theme and set the language 
      const theme = await themeInitializer(themeName, apiConf?.ThemeRoute);
      changeLanguage(language ? language : "fa-IR");

      //set the settings {theme, language, idToken, refreshToken} to store 
      const initials = initData ? initData : {};
      setSettings({
        ...initials,
        theme: theme,
        language: language
      } as InitialSetting);
      
      seConfigReady(true);
    } catch (err) {
      //TODO: add a convinent alert for this
      //probaly send a postmessage to parent
    }
  }, []);

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <>
      <GlobalStyle />

      <MaterialThemeProvider>
        {configReady ? (
          <div className="mx-auto md:container">
            <AppAlerts />
            <div className="content-star xl:w-2/4 m-auto grid grid-rows-1 gap-y-4 p-7 md:w-3/4 lg:w-3/5">
              <Outlet />
            </div>
          </div>
        ) : (
          <Loader showLoader={!configReady}></Loader>
        )}
      </MaterialThemeProvider>
    </>
  );
};

export default Layout;
