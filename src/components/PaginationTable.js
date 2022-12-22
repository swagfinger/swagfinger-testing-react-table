import React, {useMemo} from 'react';
import {useTable, usePagination} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import './table.css';

const PaginationTable = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> GROUPED_COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, page, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state} = useTable({
    columns,
    data
  }, usePagination);

  const {pageIndex} = state;

  return ( 
    <>
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup)=>{
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column=> {
                    return (
                      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                    );
                  })
                }
              </tr>
            )
          })
        }
      </thead>

      <tbody {...getTableBodyProps()}>
        {
          page.map(row=>{
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell)=>{
                    return (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>);
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
      
    </table>
    <div>
      <span>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></span>
      <button onClick={()=> previousPage()} disabled={!canPreviousPage}>previous</button>
      <button onClick={()=> nextPage()} disabled={!canNextPage}>next</button>
    </div>
    </>
  );
}
 
export default PaginationTable;