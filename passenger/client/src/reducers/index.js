import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import searchReducer from "./searchReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import statusReducer from './statusReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  search: searchReducer,
  product: productReducer,
  cart: cartReducer,
  status:statusReducer
});
