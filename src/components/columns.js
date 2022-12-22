import {format} from 'date-fns';
//import {ColumnFilter} from './ColumnFilter'; //using global setting in FilteringTable: defaultColumn

export const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters:true,
    //Filter: ColumnFilter,
    sticky:'left'
  },
  {
    Header:'First Name',
    Footer:'First Name',
    accessor:'first_name',
    //Filter: ColumnFilter,
    sticky:'left'
  },
  {
    Header: 'Last Name',
    Footer: 'Last Name',
    accessor:'last_name',
    //Filter: ColumnFilter
    sticky:'left'
  },
  {
    Header: 'Date of Birth',
    Footer: 'Date of Birth',
    accessor: 'date_of_birth',
    // controls what is rendered in ui
    Cell: ({value})=>{
      return format(new Date(value), 'yyyy-mm-dd')
    },
    //Filter: ColumnFilter
  },
  {
    Header: 'Country',
    Footer: 'Country',
    accessor: 'country',
    //Filter: ColumnFilter
  },
  {
    Header: 'Phone',
    Footer: 'Phone',
    accessor: 'phone',
    //Filter: ColumnFilter
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email',
    //Filter: ColumnFilter
  },
  {
    Header: 'Age',
    Footer: 'Age',
    accessor: 'age',
    //Filter: ColumnFilter
  },
  
];

export const GROUPED_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    columns:[
      {
        Header:'First Name',
        Footer:'First Name',
        accessor:'first_name'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor:'last_name'
      },
    ]
  },
  {
    Header:'Info',
    Footer:'Info',
    columns:[
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth'
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      }  
    ]
  }
]