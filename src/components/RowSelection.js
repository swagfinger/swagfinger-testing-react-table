import React, {useMemo} from 'react';
import {useTable, useRowSelect} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS, GROUPED_COLUMNS} from './columns';
import {Checkbox} from './Checkbox';
 
import './table.css';

//for selecting data
export const RowSelection = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  // const columns = useMemo(()=> GROUPED_COLUMNS, []);
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const {getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow, selectedFlatRows} = useTable({
    columns,
    data
  }, useRowSelect, (hooks)=>{
    hooks.visibleColumns.push(columns => 
     [{
        id:'selection', 
        Header: ({getToggleAllRowsSelectedProps})=>
          <Checkbox {...getToggleAllRowsSelectedProps()}/>
        ,
        Cell:({row})=>
          <Checkbox {...row.getToggleRowSelectedProps()}/>
        
    }, ...columns]
    
  )});

  const firstPageRows = rows.slice(0,10);

  return ( 
    <>
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup, rowIndex)=>{
            return (
              <tr key={rowIndex} {...headerGroup.getHeaderGroupProps()}>
                {
                  headerGroup.headers.map((column, index)=> {
                    return (
                      <th key={index} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
          firstPageRows.map((row, rowIndex)=>{
            prepareRow(row);
            return (
              <tr key={rowIndex}{...row.getRowProps()}>
                {
                  row.cells.map((cell, index)=>{
                    return (<td key={index} {...cell.getCellProps()}>{cell.render('Cell')}</td>);
                  })
                }
              </tr>
            )
          })
        }
      </tbody>
      
    </table>
    <pre>
      <code>
        {
          JSON.stringify({
            selectedFlatRows:selectedFlatRows.map(row=> row.original)
          }, null, 2)
        }
      </code>
    </pre>
    </>
  );
}
 
