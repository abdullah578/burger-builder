import * as actionTypes from "../actions/actionsTypes";
const initialState = {
  orders: [],
  dispSpinner: false,
  purchase: false,
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchase: false,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat({ id: action.id, ...action.data }),
        dispSpinner: false,
        purchase: true,
      };

    case actionTypes.PURCHASE_BURGER_FAILURE:
      return { ...state, dispSpinner: false };
    case actionTypes.ORDER_INIT:
      return { ...state, dispSpinner: true };
    case actionTypes.ORDER_SUCCESS:
      return { ...state, dispSpinner: false, orders: action.orders };
    case actionTypes.ORDER_FAILURE:
      return { ...state, dispSpinner: false, orders: action.orders };
    case actionTypes.SET_SPINNER:
      return { ...state, dispSpinner: true };
    default:
      return state;
  }
};

export default orderReducer;
