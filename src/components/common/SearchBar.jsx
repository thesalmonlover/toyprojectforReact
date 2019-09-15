import React, { Component } from 'react';

class SearchBar extends Component {
    
    render() { 
        return ( 
            <input type="search" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
         );
    }
}
 
export default SearchBar;