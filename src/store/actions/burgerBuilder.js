import * as actionTypes from "./actionsTypes";
import axios from "../../axios-config";

export const addIngredient = (ingredient) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient,
});

export const deleteIngredient = (ingredient) => ({
  type: actionTypes.DELETE_INGREDIENT,
  ingredient,
});
export const fetchIngredients = () => (dispatch) =>
  axios
    .get("/ingredients.json")
    .then((resp) =>
      dispatch({ type: actionTypes.SET_INGREDIENTS, ingredients: resp.data })
    )
    .catch((err) => {
      dispatch({ type: actionTypes.APP_BROKEN });
    });
export const priceInit =() => ({ type: actionTypes.PRICE_INIT });
