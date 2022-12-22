import React, {useMemo} from 'react';
import {useTable, useGlobalFilter, useFilters, useSortBy} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import './table.css';
import GlobalFilter from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const FilteringTable = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);
  const defaultColumn = useMemo(()=> {
    return {
     Filter: ColumnFilter 
    }
  }, []);//properties to apply to every column

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, state, setGlobalFilter} = useTable({
    columns,
    data,
    defaultColumn
  }, useFilters, useGlobalFilter, useSortBy);

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
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                          {column.render('Header')}
                          <span>  
                            {column.isSorted ? (column.isSortedDesc ? 'V': '^'): " "}
                          </span>
                          <div>{column.canFilter ? column.render('Filter'):null}</div>
                        </th>
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