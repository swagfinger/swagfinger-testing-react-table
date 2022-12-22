import React, {useMemo} from 'react';
import {useTable, useSortBy} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import './table.css';

const SortingTable = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> GROUPED_COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow} = useTable({
    columns,
    data
  }, useSortBy);

  return ( 
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup)=>{
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map(column=> {
                    return (
                      // adds sorting properties to header column
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                      <span>  
                        {column.isSorted ? (column.isSortedDesc ? '↓': '↑'): " "}
                      </span>
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
  );
}
 
export default SortingTable;