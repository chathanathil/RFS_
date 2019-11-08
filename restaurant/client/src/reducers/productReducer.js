import { SET_PRODUCT_NULL } from "../actions/types";

const initialState = {
  product: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT_NULL:
      return {
        ...state,
        product: null
      };
  }
}
