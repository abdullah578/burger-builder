import * as actionTypes from "../actions/actionsTypes.js";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  appBroken: false,
};
const INGREDIENT_PRICES = {
  salad: 0.7,
  meat: 1,
  cheese: 0.8,
  bacon: 1.3,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        appBroken: false,
      };
    case actionTypes.PRICE_INIT:
      return {
        ...state,
        totalPrice: 4,
      };
    case actionTypes.APP_BROKEN: {
      return {
        ...state,
        appBroken: true,
      };
    }
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };

    default:
      return state;
  }
};
export default burgerReducer;
