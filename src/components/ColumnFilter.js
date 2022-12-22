// receives column as its props
export const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column;

  return ( <span>
    <input value={filterValue || ''} onChange={e=> setFilter(e.target.value)} />
  </span> );
}
 
