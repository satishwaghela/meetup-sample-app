import React from 'react';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Site from '../../modules/Site';
import ParticipantListing from '../../modules/ParticipantListing';

function Participants () {

  return (
    <Site>
      <Paper>
        <Box p={3}>
          <Typography variant='h5'>
            Participants
          </Typography>
          <Divider />
          <br />
          <ParticipantListing />
        </Box>
      </Paper>
    </Site>
  );
}

export default Participants;
