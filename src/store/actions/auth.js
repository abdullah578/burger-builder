import * as actionTypes from "./actionsTypes";
import axios from "axios";

const authLogout = (expirationTime) => (dispatch) =>
  setTimeout(
    () => dispatch({ type: actionTypes.AUTH_LOGOUT }),
    parseInt(expirationTime) * 1000
  );
export const authenticate = (email, password, isSignUp) => (dispatch) => {
  dispatch({ type: actionTypes.AUTH_START });
  axios
    .post(
      isSignUp
        ? `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
${process.env.REACT_APP_API_KEY}`
        : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,
      { email, password, returnSecureToken: true }
    )
    .then((resp) => {
      dispatch({
        type: actionTypes.AUTH_SUCCESS,
        token: resp.data.idToken,
        userid: resp.data.localId,
      });
      dispatch(authLogout(resp.data.expiresIn));
      console.log(resp.data);
    })
    .catch((err) =>
      dispatch({
        type: actionTypes.AUTH_FAILURE,
        error: err.response.data.error,
      })
    );
};
export const set_auth_redirect = (url) => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path: url,
});
