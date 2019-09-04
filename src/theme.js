import { createMuiTheme } from '@material-ui/core/styles';
  
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto, sans-serif',
      'Circular Std, sans-serif',
    ].join(','),
    fontSize: 12,
  },
  palette: {
    primary: {
      main: 'rgb(58,100,49)', // pine green
    },
    secondary: {
      main: 'rgb(215,98,35)' // brownish orange
    },
  },
  overrides: {
    MuiButton: {
      root: {
        variant: 'contained',
        backgroundColor: 'rgb(215, 98, 35)',
        color: '#fff',
        textTransform: 'none',
        fontWeight: '100',
        fontSize: '.85rem',
      },
    },
    MuiFormControl: {
      root: {
        backgroundColor: '#fff',
        color: 'rgb(215,98,35)',
        borderRadius: 4,
        border: '1px solid #ced4da',
        marginTop: '7px',
        paddingLeft: '5px',
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: 700,
      },
      body: {
        fontWeight: 700,
      },
    },
    MuiSvgIcon: {
      colorAction: {
        color: 'rgb(255,170,69)',
      },
      colorError: {
        color: 'rgb(255,99,99)',
      },
    },
  },
});


export default theme;
