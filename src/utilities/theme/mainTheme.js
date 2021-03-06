import { createTheme } from "@mui/material/styles";

let theme = createTheme();

theme = createTheme(theme, {
    primary: {
        main: '#ff4400',
    },
    secondary: {
        light: '#0066ff',
        main: '#0044ff',
        contrastText: '#ffcc00',
    },
    custom: {
        light: '#ffa726',
        main: '#f57c00',
        dark: '#ef6c00',
        backgound: 'rgb(245, 247, 249)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
});
export default theme;