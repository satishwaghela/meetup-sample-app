import React from 'react';
import PropTypes from 'prop-types';

import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';

import MyTablePagination from './TablePagination';

import { useTable, useSortBy, usePagination } from 'react-table';

export default function Table ({
  columns,
  data,
  totalCount = 0,
  rowsPerPage,
  pageIndex: defaultPageIndex = 0,
  pageCount,
  sortBy: defaultSortBy,
  tableSize = 'small',
  onTableStateChange,
  loading
}) {
  const {
    getTableProps, headerGroups, rows, prepareRow,
    // gotoPage,
    state: { pageIndex, pageSize, sortBy }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: defaultPageIndex, sortBy: defaultSortBy },
      manualSortBy: true,
      manualPagination: true,
      pageCount: pageCount
    },
    useSortBy,
    usePagination
  );

  const _onTableStateChange = () => {
    onTableStateChange({ pageIndex, pageSize, sortBy });
  }; // https://github.com/facebook/react/issues/15865#issuecomment-659691323
  React.useEffect(_onTableStateChange, [pageIndex, pageSize, sortBy]);

  const handlePageChange = (event, page) => {
    // gotoPage(page); // https://github.com/tannerlinsley/react-table/issues/2321
    onTableStateChange({ pageIndex: page, pageSize, sortBy });
  };

  return (
    <>
      <MaUTable {...getTableProps()} size={tableSize}>
        <TableHead>
          {headerGroups.map((headerGroup, i) => (
            <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, columnKey) => {
                const sortByToggleProps = column.sortable ? column.getSortByToggleProps() : undefined;
                const headerProps = column.getHeaderProps(sortByToggleProps);
                const content = column.render('Header');
                return (
                  <TableCell {...headerProps} key={columnKey}>
                    {content}
                    {column.sortable && (
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()} key={i}>
                {row.cells.map((cell, cellKey) => {
                  return (
                    <TableCell {...cell.getCellProps()} key={cellKey}>
                      {cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <MyTablePagination totalCount={totalCount} pageSize={rowsPerPage} page={defaultPageIndex} handlePageChange={handlePageChange} />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  pageIndex: PropTypes.number,
  rowsPerPage: PropTypes.number,
  totalCount: PropTypes.number,
  pageCount: PropTypes.number,
  sortBy: PropTypes.array,
  tableSize: PropTypes.string,
  onTableStateChange: PropTypes.func,
  loading: PropTypes.bool
};
