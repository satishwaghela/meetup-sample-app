import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      width: theme.custom.sideMenuBarDrawer.collapsedWidth,
      flexShrink: 0
    },
    drawerExpanded: {
      width: theme.custom.sideMenuBarDrawer.expandedWidth
    },
    drawerPaperBoxShadow: {
      boxShadow: '2px 0 6px -2px rgb(0,0,0,0.2)'
    },
    drawerPaperTransition: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shortest
      })

    },
    drawerPaper: {
      width: theme.custom.sideMenuBarDrawer.collapsedWidth,
      overflow: 'hidden'
    },
    drawerExpandedPaper: {
      width: theme.custom.sideMenuBarDrawer.expandedWidth
    }
  };
});

export default useStyles;
