import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = props => {
    const {count, pageNumber, onClick,currentPage} = props;
    const number = Math.ceil( count/pageNumber);
    const pageArray = _.range(1, number+1);
    
    if(number ===1) return null;
    return ( 
         <nav className="Page navigation">
            <ul className="pagination">
                {pageArray.map( number => 
                    <li onClick={() => onClick(number)} key={number} className={currentPage===number ? "page-item active" : "page-item"}><a className="page-link">{number}</a></li>
                )}
                
            </ul>
         </nav>
     );
}
 
Pagination.propTypes={
    count:PropTypes.number.isRequired,
    pageNumber:PropTypes.number.isRequired,
    onClick:PropTypes.func.isRequired,
    currentPage:PropTypes.number.isRequired
}

export default Pagination;