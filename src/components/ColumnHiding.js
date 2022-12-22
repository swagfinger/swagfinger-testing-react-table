import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import {Checkbox} from './Checkbox';
import './table.css';

const ColumnHiding = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> GROUPED_COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, allColumns, getToggleHideAllColumnsProps} = useTable({
    columns,
    data
  });

  return ( 
    <>
    <div>
      <div>
        <Checkbox {...getToggleHideAllColumnsProps()}/>ToggleAll
      </div>
      {
        allColumns.map(column=>(
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()}/>
            {column.Header}
          </label>
        </div>)
        )
      }
    </div>
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
 
export default ColumnHiding;