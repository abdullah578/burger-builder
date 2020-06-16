import * as actionTypes from "./actionsTypes";
import axios from "../../axios-config";

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});
export const purchaseHandler = (orderData) => (dispatch) =>
  axios
    .post("/orders.json", orderData)
    .then((resp) => {
      dispatch({
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: resp.data.name,
        data: orderData,
      });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.PURCHASE_BURGER_FAILURE });
    });

export const setSpinner = () => ({
  type: actionTypes.SET_SPINNER,
});
export const fetchOrders = () => (dispatch) => {
  dispatch({ type: actionTypes.ORDER_INIT });
  axios
    .get("/orders.json")
    .then((resp) => {
      const fetch = resp.data
        ? Object.keys(resp.data).map((key) => ({
            ...resp.data[key],
            id: key,
          }))
        : [];
      dispatch({ type: actionTypes.ORDER_SUCCESS, orders: fetch });
    })
    .catch({ type: actionTypes.ORDER_FAILURE });
};
