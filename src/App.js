import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/Movies";
import MoviesForm from "./components/MoviesForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NavBar from "./components/NavBar";
import NotFound from '../src/components/NotFound';
import LoginForm from './components/common/LoginForm';
import RegisterForm from "./components/common/RegisterForm";
import "./App.css";


class App extends Component {
 
  render() { 
    return ( 
      <React.Fragment>
        <NavBar />
        <main className="container">
      <Switch >
      <Route path="/movies/:id" component={MoviesForm} />
      <Route path="/movies" component={Movies} />
      <Route path="/notfound" component={NotFound} />
      <Route path="/customers" component={Customers} />
      <Route path="/rentals" component={Rentals} />
      <Route path="/login" component={LoginForm} />
      <Route path="/register" component={RegisterForm} />
      <Redirect from="/" to="/movies" exact />
      <Redirect to="/notfound" />
      </Switch>
      </main>
      </React.Fragment>
     );
  }
}
 
export default App;


