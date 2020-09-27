import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import unblockLoaderStyles from './UnblockLoaderStyles';

export default function UnblockLoader (props) {
  const { loadingText = 'Loading...' } = props;

  const classes = unblockLoaderStyles();

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography>{loadingText}</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

UnblockLoader.propTypes = {
  loadingText: PropTypes.string
};
