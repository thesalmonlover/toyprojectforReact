import Movies from "./components/Movies";
import MoviesForm from "./components/MoviesForm";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import NavBar from "./components/NavBar";
import NotFound from "../src/components/NotFound";
import LoginForm from "./components/common/LoginForm";
import Logout from "./components/common/Logout";
import RegisterForm from "./components/common/RegisterForm";
import auth from "./services/authService";
import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar user={this.state.user} />
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MoviesForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/notfound" component={NotFound} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
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
