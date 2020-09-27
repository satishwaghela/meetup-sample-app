import React from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Site from '../modules/Site';
import Dashboard from '../modules/Dashboard';

function Home () {

  return (
    <Site>
      <Box p={3}>
        <Box>
          <Typography variant='h5'>
            Dashboard
          </Typography>
        </Box>
        <Dashboard />
      </Box>
    </Site>
  );
}

export default Home;
