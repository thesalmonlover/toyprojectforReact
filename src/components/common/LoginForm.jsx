import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import auth from '../../services/authService';
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = async () => {
   try {
    await auth.login(this.state.data);
    window.location="/";
   } catch (error) {
     if(error.response&&error.response.status===400) {
      const errors = {...this.state.errors};
      errors.username = error.response.data;
      this.setState({errors});

     }
   } 
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
