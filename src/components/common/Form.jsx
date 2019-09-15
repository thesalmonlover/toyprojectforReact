import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import Select from './Select';
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validateHandler = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const input = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(input, schema);
    return error ? error.details[0].message : null;
  };

  submitHandler = e => {
    e.preventDefault();
    const errors = this.validateHandler();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  changeHandler = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = label => {
    return (
      <button disabled={this.validateHandler()} className="btn btn-secondary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        value={data[name]}
        onChange={this.changeHandler}
        name={name}
        type={type}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, options, label) => {
    const {data, errors } = this.state;

    return <Select
    label={label}
    value={data[name]}
    options={options}
    name={name}
    error={errors[name]}
    onChange={this.changeHandler}
     />


  };
  
  
}

export default Form;
