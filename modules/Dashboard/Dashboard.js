import React, { useEffect } from 'react';
import _ from 'lodash';
import { useImmer } from 'use-immer';
import { Chart } from "react-charts";

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UnblockLoader from '../UnblockLoader';

export default function ParticipantListing (props, ref) {
  const [state, setState] = useImmer({
    loading: false,
    data: [],
    ageRangeData: [],
    localities_group: [],
    avgGroupSize: 0,
    profAndStudCount: {
      professionals: 0,
      students: 0
    }
  });

  useEffect(() => {
    setState(draft => { draft.loading = true; });
    fetch('/api/participants').then(res => res.json())
    .then(res => {
      setState(draft => {
        draft.data = res;
        draft.ageRangeData = [{ label: 'Age Count', data: [{
          primary: '13-18',
          secondary: res.filter(d => d.age >= 13 && d.age <= 18).length
        }, {
          primary: '18-25',
          secondary: res.filter(d => d.age > 18 && d.age <= 25).length
        }, {
          primary: '25+',
          secondary: res.filter(d => d.age > 25).length
        }] }]
        const localityGroup = _.groupBy(res, d => d.locality)
        draft.localities_group = [{ label: 'Guests locality Count', data:  _.map(localityGroup, (d, name) => {
          return {
            primary: name,
            secondary: d.length
          }
        })}];
        draft.profAndStudCount.professionals = res.filter(r => r.profession === 'Employed').length
        draft.profAndStudCount.students = res.filter(r => r.profession === 'Student').length
        draft.loading = false;
      });
    }).catch(e => {
      setState(draft => {
        draft.data = [];
        draft.loading = false;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const series = React.useMemo(
    () => ({
      type: "bar"
    }),
    []
  );
  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "left" },
      { position: "bottom", type: "linear", stacked: true }
    ],
    []
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={6}>
          <Paper>
            <Box p={3}>
              <Typography>Age Count</Typography>
              <div style={{height: '200px'}}>
                <Chart data={state.ageRangeData} series={series} axes={axes} tooltip />
              </div>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper>
            <Box p={3}>
              <Typography>Guests Locality Count</Typography>
              <div style={{height: '200px'}}>
                <Chart data={state.localities_group} series={series} axes={axes} tooltip />
              </div>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={6}>
          <Paper>
            <Box p={3}>
              <Typography>Average Group Size</Typography>
              <Typography variant='h3'>
                {state.avgGroupSize}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper>
            <Box p={3}>
              <Typography>Professionals Count</Typography>
              <Typography variant='h3'>
                {state.profAndStudCount.professionals}
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item sm={3}>
          <Paper>
            <Box p={3}>
              <Typography>Students Count</Typography>
              <Typography variant='h3'>
                {state.profAndStudCount.students}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {state.loading && <UnblockLoader />}
    </>
  );
}
