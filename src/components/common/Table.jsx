import React from 'react';
import TableHeader from './TableHeader';
import TableBody from "./TableBody";

const Table = (props) => {
    const {columns, data, onSort, sortColumn} = props;
    return ( 
        <table className="table">
          <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn}  />
          <TableBody data={data} columns={columns} />
          
      </table>
     );
}
 
export default Table;