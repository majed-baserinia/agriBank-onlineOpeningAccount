import "@material-ui/core/styles";

//this file should be in the root of the project
//the code declares new type for the palette colors to material UI

declare module "@mui/material/styles" {
  interface PaletteColor {
    main: string;
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    contrastText: string;
  }
}
