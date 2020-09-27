import React, { useEffect } from 'react';
import { useImmer } from 'use-immer';

import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Table from '../Table';
import UnblockLoader from '../UnblockLoader';

export default function ParticipantListing (props, ref) {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Age',
        accessor: 'age'
      }, {
        Header: 'DOB',
        accessor: 'dob'
      }, {
        Header: 'Profession',
        accessor: 'profession'
      }, {
        Header: 'Locality',
        accessor: 'locality'
      }, {
        Header: 'Number of Guests',
        accessor: 'numberOfGuests'
      }, {
        Header: 'Address',
        accessor: 'address'
      }
    ],
    []
  );

  const [state, setState] = useImmer({
    page: 0,
    rowsPerPage: 10,
    sortBy: [],
    loading: false,
    tableData: []
  });

  useEffect(() => {
    const data = [{ firstName: 'canvas', lastName: 'ray', age: 26, visits: 41, progress: 99, status: 'relationship' }, { firstName: 'platform', lastName: 'wind', age: 0, visits: 32, progress: 28, status: 'single' }, { firstName: 'television', lastName: 'hat', age: 17, visits: 72, progress: 31, status: 'relationship' }, { firstName: 'governor', lastName: 'equipment', age: 11, visits: 51, progress: 54, status: 'relationship' }, { firstName: 'cave', lastName: 'championship', age: 0, visits: 48, progress: 63, status: 'single' }, { firstName: 'tramp', lastName: 'twig', age: 4, visits: 42, progress: 70, status: 'single' }, { firstName: 'square', lastName: 'street', age: 18, visits: 13, progress: 48, status: 'relationship' }, { firstName: 'night', lastName: 'vase', age: 5, visits: 83, progress: 42, status: 'single' }, { firstName: 'part', lastName: 'bears', age: 15, visits: 70, progress: 38, status: 'complicated' }, { firstName: 'cork', lastName: 'leather', age: 18, visits: 31, progress: 27, status: 'single' }, { firstName: 'home', lastName: 'loaf', age: 16, visits: 31, progress: 72, status: 'single' }, { firstName: 'priority', lastName: 'toothbrush', age: 1, visits: 89, progress: 62, status: 'complicated' }, { firstName: 'sweater', lastName: 'man', age: 20, visits: 44, progress: 69, status: 'complicated' }, { firstName: 'blow', lastName: 'plants', age: 28, visits: 23, progress: 1, status: 'relationship' }, { firstName: 'burst', lastName: 'appliance', age: 0, visits: 28, progress: 64, status: 'single' }, { firstName: 'account', lastName: 'beam', age: 20, visits: 75, progress: 75, status: 'relationship' }, { firstName: 'weight', lastName: 'paper', age: 7, visits: 72, progress: 64, status: 'relationship' }, { firstName: 'bridge', lastName: 'channel', age: 29, visits: 21, progress: 47, status: 'relationship' }, { firstName: 'governor', lastName: 'glass', age: 19, visits: 56, progress: 30, status: 'relationship' }, { firstName: 'brothers', lastName: 'entertainment', age: 18, visits: 52, progress: 45, status: 'relationship' }];
    setState(draft => { draft.loading = true; });
    fetch('/api/participants').then(res => res.json())
    .then(res => {
      setState(draft => {
        draft.tableData = res;
        draft.loading = false;
      });
    }).catch(e => {
      setState(draft => {
        draft.tableData = [];
        draft.loading = false;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTableStateChange = ({ pageSize, pageIndex, sortBy }) => {
    setState(draft => {
      draft.page = pageIndex;
      draft.rowsPerPage = pageSize;
      draft.sortBy = sortBy;
    });
  };

  const dataStartIndex = state.page * state.rowsPerPage;

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              columns={columns}
              data={state.tableData.slice(dataStartIndex, dataStartIndex + state.rowsPerPage)}
              pageIndex={state.page}
              rowsPerPage={state.rowsPerPage}
              totalCount={state.tableData.length}
              sortBy={state.sortBy}
              pageCount={Math.ceil(state.tableData.length / state.rowsPerPage) - 1}
              onTableStateChange={onTableStateChange}
              loading={state.loading}
            />
          </TableContainer>
        </Grid>
      </Grid>
      {state.loading && <UnblockLoader />}
    </>
  );
}
