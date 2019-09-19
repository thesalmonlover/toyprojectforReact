import http from "./httpService";
import jwtDecode from "jwt-decode";
import { URL } from "../config.json";
import { userRegister } from "./userService";
const apiURL = `${URL}/auth`;
const token = "token";

http.setToken(getToken());

export async function login({ username, password }) {
  const { data: jwt } = await http.post(apiURL, {
    email: username,
    password: password
  });
  localStorage.setItem(token, jwt);
}

export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(token));
  } catch (e) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(token);
}

export async function loginNregister(data) {
  const response = await userRegister(data);
  localStorage.setItem(token, response.headers["x-auth-token"]);
}

export function getToken(){
    return localStorage.getItem(token);

}

export default {
  login,
  logout,
  loginNregister,
  getCurrentUser,
  getToken
};
