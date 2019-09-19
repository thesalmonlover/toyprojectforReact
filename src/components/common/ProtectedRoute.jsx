import React from 'react';
import {getCurrentUser} from '../../services/authService';
import {Route, Redirect} from 'react-router-dom';

const ProtectedRoute = ({ composition:Composition,render, ...rest}) => {
    return ( 
        <Route {...rest} render={props => { console.log(props); if(!getCurrentUser()) return <Redirect to={ {
            pathname:"/login", state: { from : props.location}
        }
            
        } />;
            return Composition? <Composition {...props}  /> : render(props); 
}} />
    );
}
 
export default ProtectedRoute;