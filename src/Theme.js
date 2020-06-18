import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#232323',
        },
    },
    typography: {
        fontSize: 8,
        body1: {
            fontSize: '1.3rem',
        },
        body2: {
            fontSize: '1rem',
        },
    },
});

export default theme;
