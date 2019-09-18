import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import auth from '../../services/authService';
class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: ""
    },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name")
  };

  doSubmit = async () => {
    try {
     await auth.loginNregister(this.state.data);
      window.location="/";
    } catch (e) {
      if(e.response && e.response.status===400) {
        const errors = {...this.state.errors};
        errors.username = e.response.data;
        this.setState({errors});
      }
    }
    
  };

  render() {

    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
