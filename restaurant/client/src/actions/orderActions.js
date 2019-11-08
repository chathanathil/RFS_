import axios from "axios";
import { SHOW_ORDERS, SELECT_ORDER_BY_ID, DELETE_ORDER } from "./types";

// Show all orders
export const showOrders = () => dispatch => {
  axios
    .get("http://localhost:5000/api/orders")
    .then(res => {
      dispatch({
        type: SHOW_ORDERS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Show order by id
export const selectOrder = id => dispatch => {
  axios.get(`http://localhost:5000/api/orders/${id}`).then(res => {
    dispatch({
      type: SELECT_ORDER_BY_ID,
      payload: res.data
    });
  });
};

// Accept order
export const acceptOrder = deliverBoy => dispatch => {
  axios
    .post("http://localhost:5000/api/delivery/add", deliverBoy)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

// Delete order
export const deleteOrder = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/orders/${id}`)
    .then(order => console.log(order))
    .catch(err => console.log(err));
};
