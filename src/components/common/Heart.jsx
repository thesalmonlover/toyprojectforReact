import React, { Component } from 'react';

class Heart extends Component {
    
    render() { 
        let classes = "fa fa-heart-o"
        if(this.props.liked) classes="fa fa-heart"
        return ( 
            <i className={classes} aria-hidden="true" onClick={() => this.props.onClick(this.props.data)}></i>
         );
    }
}
 
export default Heart;