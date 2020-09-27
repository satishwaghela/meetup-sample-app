import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => {

  const appBarHeight = theme.custom.appBar.height;

  return {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      zIndex: theme.zIndex.tooltip + 1,
      top: `calc(${appBarHeight} + ${theme.spacing(3)}px)`,
      left: 0,
      right: 0,
      height: 0
    },
    card: {
      background: '#fdd8a3'
    },
    cardContent: {
      padding: theme.spacing(1, 1.5),
      '&:last-child': {
        paddingBottom: theme.spacing(1)
      }
    }
  };
});

export default useStyles;
