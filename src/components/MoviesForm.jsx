import React, { Fragment } from "react";
import Form from "./common/Form";
import Joi from 'joi-browser';
import { getGenres } from "../services/genreService";
import {getMovie, saveMovie} from '../services/movieService';

class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres:[],
    errors: {}
  };


  async populateGenre() {
    const {data:genres} = await getGenres()
    this.setState({genres});
  }

  async populateMovie() {
    try{
      if(this.props.match.params.id==="new") return;
      const {data:movie} = await getMovie(this.props.match.params.id);
      this.setState({data:this.setMovieData(movie)});
    }
    catch (e) {
      if(e.rsponse&&e.response.status)
      this.props.history.replace('/notfound');
      
    }

  }

  async componentDidMount() {
    await this.populateGenre();
    await this.populateMovie();
    
  }

  setMovieData= movie => {
      
    return {
        _id:movie._id,
        title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    }

  }

  schema = {
      _id:Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).required().label("Stock"),
    dailyRentalRate:Joi.number().min(0).max(10).required().label("Rate")
  };

   doSubmit = async () => {
   await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

 

  render() {

    return (
      <Fragment>
        <h3>MoviesForm</h3>
        <form onSubmit={this.submitHandler}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", this.state.genres, "Genre")}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </Fragment>
    );
  }
}

export default MoviesForm;
