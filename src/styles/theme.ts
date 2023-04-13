import { createTheme } from '@mui/material';
import { blue, deepPurple } from '@mui/material/colors';

import RobotoMonoWoff2 from 'fonts/RobotoMono-Regular.woff2';

const common = {
    typography: {
        fontFamily: 'Roboto Mono, Roboto, Courier New, Courier, monospace',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                @font-face {
                    font-family: 'Roboto Mono';
                    font-style: normal;
                    font-display: swap;
                    font-weight: 400;
                    src: local('Roboto Mono'), local('Roboto Mono-Regular'), url(${
                        RobotoMonoWoff2 as string
                    }) format('woff2');
                    unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
                }
        `,
        },
    },
};

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: deepPurple[900],
            light: deepPurple[400],
            dark: '#000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: blue[900],
            light: blue[700],
            dark: '#000',
            contrastText: '#ffffff',
        },
        error: {
            main: '#ff4444',
        },
        background: {
            default: `rgb(5, 5, 12)`,
        },
        text: {
            primary: '#dddddd',
            secondary: '#ffffff',
        },
    },
    ...common,
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: deepPurple[700],
            light: deepPurple[500],
            dark: deepPurple[900],
            contrastText: '#ffffff',
        },
        secondary: {
            main: blue[700],
            light: blue[500],
            dark: blue[900],
            contrastText: '#ffffff',
        },
        error: {
            main: '#ff4444',
        },
        background: {
            default: '#f5f5f5',
        },
        text: {
            primary: '#000',
            secondary: '#000',
        },
    },
    ...common,
});
