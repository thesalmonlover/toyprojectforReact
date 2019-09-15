import React, { Component } from 'react';

class TableHeader extends Component {

    raiseSort = sort => {
        let sortColumn = { ...this.props.sortColumn };
        if(sortColumn.path===sort)  sortColumn = {path:sort, order: sortColumn.order==="asc" ? "desc" : "asc"}
       else {sortColumn= {path:sort, order:"asc"}} 
        this.props.onSort(sortColumn);
      };

      addSortIcon = column => {
          const {sortColumn} = this.props;
        if(sortColumn.path!==column.path) return null;
        if(sortColumn.order==="asc") return <i className="fa fa-sort-asc"></i>
        if(sortColumn.order==="desc") return <i className="fa fa-sort-desc"></i>

      }

    render() {
        
        
        return ( 
            <thead>
                <tr>
                    {this.props.columns.map(column => 
                        <th className="clickable" key={column.path||column.key} onClick={() => this.raiseSort(column.path||column.key)}>{column.name}{this.addSortIcon(column)}</th>
                    )}
                    
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;