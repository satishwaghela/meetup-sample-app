import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    // type: 'light',
    primary: {
      light: '#00a0f0',
      main: '#00a0f0',
      dark: '#4a65f5',
      contrastText: '#fff'
    }
  },
  custom: {
    appBar: {
      height: '64px'
    },
    sideMenuBarDrawer: {
      collapsedWidth: '60px',
      expandedWidth: '240px'
    }
  }
});

// console.log('theme', theme);

export default theme;
