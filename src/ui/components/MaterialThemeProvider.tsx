import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ButtonProps, CssBaseline, TextFieldProps, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import useInitialSettingStore from "../../business/stores/initial-setting-store";

interface Props {
  children: ReactNode;
}

const MaterialThemeProvider = ({ children }: Props) => {
  const settings = useInitialSettingStore((s) => s.settings);

  const themeTemplate = createTheme({
    ...settings.theme,
    direction: settings.language === "fa-IR" ? "rtl" : "ltr",
    typography: {
      fontFamily: settings.language === "fa-IR" ? "IRANSans" : "Roboto , sans-serif"
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "8px 16px"
          },
          sizeSmall: {
            height: "32px",
            borderRadius: 8
          },
          sizeMedium: {
            height: "40px",
            borderRadius: 10
          },
          sizeLarge: {
            height: "48px",
            borderRadius: 16
          }
        },
        variants: [
          {
            props: (props: Partial<ButtonProps>) => props.variant === "text",
            style: (props) => {
              return {
                "&:focus": {
                  border: `1.5px solid ${props.theme.palette.primary.main}`,
                  backgroundColor: props.theme.palette.action.hover
                }
              };
            }
          },
          {
            props: (props: Partial<ButtonProps>) => props.variant === "outlined",
            style: (props) => {
              return {
                fontSize: "14px",
                "&:hover": {
                  backgroundColor: props.theme.palette.action.focus
                },
                "&:focus": {
                  backgroundColor: props.theme.palette.action.focus
                }
              };
            }
          }
          //add more variants here
          // {
          //   props: { variant: "new varient" },
          //   style: {
          //     textTransform: "none",
          //     border: `2px new varient ${blue[500]}`
          //   }
          // }
        ]
      },
      MuiFormControl: {
        styleOverrides: {
          root: {}
        },

        variants: [
          {
            props: (props: Partial<TextFieldProps>) => props.variant === "outlined",
            style: (props) => {
              return {
                "& .MuiOutlinedInput-root": {
                  fontSize: "16px",
                  "&.Mui-focused fieldset": {
                    borderWidth: "2px"
                  },
                  "&:hover fieldset": {
                    borderColor: props.theme.palette.grey[400]
                  },
                  "&.Mui-error fieldset": {
                    borderWidth: "2px",
                    borderColor: props.theme.palette.error[400]
                  },
                  "&.Mui-error:hover fieldset": {
                    borderColor: props.theme.palette.error[500]
                  }
                },
                "& .MuiFormLabel-root": {
                  color: props.theme.palette.grey[300],

                  "&.Mui-focused": {
                    color: props.theme.palette.grey[400]
                  },

                  "&.Mui-error": {
                    color: props.theme.palette.grey[400]
                  }
                }
              };
            }
          }
        ]
      }
    }
  });

  const emotionCache = useMemo(() => {
    if (settings.language === "fa-IR") {
      return createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin]
      });
    } else {
      return createCache({ key: "css" });
    }
  }, [settings.language]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={themeTemplate}>
        <CssBaseline /* MUI Styles */ />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MaterialThemeProvider;
