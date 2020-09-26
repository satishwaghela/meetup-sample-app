import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: '#fff',
      color: theme.palette.grey[600],
      boxShadow: 'none',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    drawerIcon: {
      margin: theme.spacing(0, 2, 0, -2)
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: theme.palette.grey[600]
    },
    logo: {
      flexGrow: 1,
      paddingTop: theme.spacing(0.5)
    }
  };
});

export default useStyles;
