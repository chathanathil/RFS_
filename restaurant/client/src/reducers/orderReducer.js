import { SHOW_ORDERS, SELECT_ORDER_BY_ID,DELETE_ORDER } from "../actions/types";

const initialState = {
  orders: null,
  order: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SHOW_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case SELECT_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload
      };
      case DELETE_ORDER:
        return{
          ...state,
          order:null
        }
    default:
      return state;
  }
}
