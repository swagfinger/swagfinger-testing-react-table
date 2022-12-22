import React, {useMemo} from 'react';
import {useTable, useGlobalFilter} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import './table.css';
import GlobalFilter from './GlobalFilter';

const FilteringTable = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter} = useTable({
    columns,
    data
  }, useGlobalFilter);

  const {globalFilter} = state;

  return ( 
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
            rows.map(row=>{
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
        <tfoot>
          {
            footerGroups.map(footerGroup=>{
              return (<tr {...footerGroup.getFooterGroupProps()}>
                {
                  footerGroup.headers.map(column=>{
                    return (
                      <td {...column.getFooterProps}>
                      {
                      column.render('Footer')
                      }
                      </td>
                    )
                  })
                }
              </tr>)
            })
          }
        </tfoot>
      </table>
    </>
  );
}
 
export default FilteringTable;