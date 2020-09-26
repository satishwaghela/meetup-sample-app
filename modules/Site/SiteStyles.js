import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => {
  return {
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    containerStyle: {
      paddingTop: theme.spacing(2)
    },
    mainTopPlaceholder: {
      minHeight: theme.spacing(7)
    }
  };
});

export default useStyles;
