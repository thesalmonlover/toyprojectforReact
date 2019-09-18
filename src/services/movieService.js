import http from './httpService';
import {URL} from '../config.json';



    function movieURL(id) {
        return `${URL}/movies/${id}`;
    }

export function getMovies() {
    
    return http.get(`${URL}/movies`);
  }
  
  export function getMovie(id) {
      return http.get(movieURL(id));
  }
  
  
  export function deleteMovie(id) {
    return http.delete(movieURL(id));
  }

  export function saveMovie(movie) {
      if(movie._id) {
          const data = {...movie};
          delete data._id;
          return http.put(movieURL(movie._id), data);
      }
    
      return http.post(`${URL}/movies`, movie);
  }