import { combineReducers } from "redux";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
// import productReducer from "./productReducer";

export default combineReducers({
  auth: authReducer,
  orders: orderReducer
  // product: productReducer
});
