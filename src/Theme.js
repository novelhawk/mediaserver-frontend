import { red } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// Application theme
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
        fontSize: 10,
        body1: {
            fontSize: '1.2rem'
        },
        body2: {
            fontSize: '1rem'
        }
    },
}); 

export default responsiveFontSizes(theme);
