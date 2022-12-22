import React, {useState} from 'react';
import { useAsyncDebounce } from 'react-table';

const GlobalFilter = ({filter, setFilter}) => {
  
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce(value=>{
    setFilter(value || undefined )
  }, 400)

  return ( <span>
    <input value={value || ''} 
    onChange={e=> {
        setValue(e.target.value);//updates the input field
        onChange(e.target.value); //updates the filtered results
      }
    } />
  </span> );
}
 
export default GlobalFilter;