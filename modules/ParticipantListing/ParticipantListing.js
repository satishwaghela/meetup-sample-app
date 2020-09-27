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
