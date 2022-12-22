import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import MOCK_DATA from './MOCK_DATA.json';
import {COLUMNS} from './columns';

const BasicTable = () => {

  // useMemo to memoize columns - to ensure data is not recalculated
  const columns = useMemo(()=> COLUMNS, []);
  const data = useMemo(()=> MOCK_DATA, []);

  const tableInstance = useTable({
    columns,
    data
  })

  return ( <div>

  </div>);
}
 
export default BasicTable;