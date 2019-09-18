import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import {toast} from 'react-toastify';
import paginate from "../UI/paginate";
import SearchBar from './SearchBar';
import ListGroup from './common/ListGroup';
import {Link} from 'react-router-dom';
import MoviesTable from './MoviesTable';
import Pagination from './common/Pagination';


class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentGenre:null,
    pageNumber: 4,
    currentPage: 1,
    sortColumn: {path:"title", order:'asc'},
    searchWord: ""
  };

  async componentDidMount() {
    const {data} = await getGenres();
    let genres = [{ _id: "", name: "All Genres" }, ...data];
    const {data:movies} = await getMovies();
    this.setState({ movies, genres });
  }

   deleteHandler = async movie => {
    const original = [...this.state.movies];
    const movies = original.filter(m => m._id!==movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);

    }
    catch (e) {
      if(e.response&&e.response.status===404) {
        toast.error("the movie has been already deleted");
        this.setState({movies:original});
      }
      
    }
   
  };

  likeHandler = movie => {
    const movies = [...this.state.movies];
    const i = movies.indexOf(movie);
    movie.like = !movie.like;
    movies[i] = movie;
    this.setState({ movies });
  };

  pageHandler = page => {
    this.setState({ currentPage: page });
  };

  genreHandler = genre => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };

  sortHandler = sortColumn => {
   this.setState({sortColumn});
  };

  searchHandler= ({currentTarget}) => {
    this.setState({currentPage:1, currentGenre:null, searchWord:currentTarget.value });
    
  }

  getPagedData = () => {
    const {
      movies,
      pageNumber,
      currentPage,
      currentGenre,
      sortColumn,
      searchWord
    } = this.state;

    let filteredmovies = movies;

    if(searchWord) {
     filteredmovies = movies.filter(movie => 
       movie.title.toLowerCase().startsWith(searchWord.toLowerCase())
     );
    } else if(currentGenre && currentGenre._id) {
      filteredmovies=movies.filter(movie => movie.genre._id === currentGenre._id)
    }
    
    const sortedmovies = _.orderBy(filteredmovies, sortColumn.path, sortColumn.order);
    const paginatedmovies = paginate(currentPage, sortedmovies, pageNumber);
    return {data:paginatedmovies, count:sortedmovies.length}
  }

  render() {
    const {
      movies,
      pageNumber,
      currentPage,
      genres,
      currentGenre,
      sortColumn,
      searchWord
    } = this.state;

    if (movies.length === 0) return <p>There are no movies in the database</p>;

    const {data, count} = this.getPagedData();
    
    return (
      <div >

      <div className="row">
        
        <div className="col-2">
        
          <ListGroup
            genres={genres}
            onClick={this.genreHandler}
            currentGenre={currentGenre}
          />
        </div>
        <div className="col">
          <p>There are {count} movies in the database</p>
          <Link to="/movies/new" className="btn btn-primary mb-2">add New Movie</Link>
          <SearchBar onChange={this.searchHandler} value={searchWord} />
           <MoviesTable
            data={data}
            onLike={this.likeHandler}
            onDelete={this.deleteHandler}
            onSort={this.sortHandler}
            sortColumn={sortColumn}
          />
          <Pagination
            onClick={this.pageHandler}
            pageNumber={pageNumber}
            count={count}
            currentPage={currentPage}
          />
        </div>
      </div>
      </div>
    );
  }
}

export default Movies;
