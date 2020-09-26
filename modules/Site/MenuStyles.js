import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    menuIcon: {
      minWidth: '44px'
    },
    listItem: {
      height: theme.spacing(6),
      width: theme.custom.sideMenuBarDrawer.expandedWidth
    },
    activeListItem: {
      background: theme.palette.grey[100],
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
      color: theme.palette.primary.light
    }
  };
});

export default useStyles;
