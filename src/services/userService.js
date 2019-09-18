import http from './httpService';
import {URL} from '../config.json';

const apiURL = `${URL}/users`;

export function userRegister (user) {
   return http.post(apiURL, {
        email:user.username,
        password:user.password,
        name:user.name
    });
}