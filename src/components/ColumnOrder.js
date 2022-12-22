import React, {useMemo} from 'react';
import {useTable, useColumnOrder} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import './table.css';

const ColumnOrder = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> GROUPED_COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, setColumnOrder} = useTable({
    columns,
    data
  },useColumnOrder);

  const changeOrder = ()=>{
    // accepts an array of column ids (accessor or explicitly specify id)
    setColumnOrder(['id','first_name','last_name', 'phone', 'country', 'date_of_birth'])
  }

  return ( 
    <>
    <button onClick={changeOrder}>Change Column order</button>
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
 
export default ColumnOrder;