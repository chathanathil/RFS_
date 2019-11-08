import axios from "axios";
import { SET_PRODUCT_NULL } from "./types";

// Post product
export const addProduct = pdt => dispatch => {
  axios
    .post("http://localhost:5000/api/products/add", pdt)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// Set product null
export const setProductNull = () => dispatch => {
  dispatch({
    type: SET_PRODUCT_NULL
  });
};
