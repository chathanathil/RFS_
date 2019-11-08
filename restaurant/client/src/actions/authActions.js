import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "./types";

// Login - Get User Token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:5000/api/restaurants/login", userData)
    .then(res => {
      history.push("/home");
      // Save to localStorege
      const { token } = res.data;
      // set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to auth header
      setAuthToken(token);
      // Decode the token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => console.log(err));
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from ls
  localStorage.removeItem("jwtToken");
  // Remove auth header for future request
  setAuthToken(false);
  // set current user {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
