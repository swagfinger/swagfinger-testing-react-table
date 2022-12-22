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

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, page, prepareRow, nextPage, previousPage, canNextPage, canPreviousPage, pageOptions, state, gotoPage, pageCount, setPageSize} = useTable({
    columns,
    data,
    initialState:{
      pageIndex: 3 //zero indexed
    }
  }, usePagination);

  const {pageIndex, pageSize} = state;

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
      <span>| goto page:<input type="number" defaultValue={pageIndex+1} 
      
      onChange={e=> {
        const pageNumber = e.target.value ? Number(e.target.value) -1 : 0;
        gotoPage(pageNumber) 
      }} 
      
      style={{width: '50px'}}
      /></span>
      <select value={pageSize} onChange={e=> setPageSize(Number(e.target.value))}>
        {
          [10,25,50].map(pageSize=>{
            return <option key={pageSize} value={pageSize}>Show {pageSize}</option>
          })
        }
      </select>
      <button onClick={()=> gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
      <button onClick={()=> previousPage()} disabled={!canPreviousPage}>previous</button>
      <button onClick={()=> nextPage()} disabled={!canNextPage}>next</button>
      <button onClick={()=> gotoPage(pageCount-1)} disabled={!canNextPage}>{'>>'}</button>
    </div>
    </>
  );
}
 
export default PaginationTable;