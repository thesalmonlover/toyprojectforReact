import React from 'react';

const SearchBar = ({...rest}) => {
    return ( 
        <input {...rest} type="search" className="form-control" placeholder="search..." ></input>
         
     );
}
 
export default SearchBar;