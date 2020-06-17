import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authLogoutCreator = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("expiry");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
const authSuccessCreator = (token, userid) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userid,
});
const authFailureCreator = (error) => ({
  type: actionTypes.AUTH_FAILURE,
  error,
});
const authLogout = (expirationTime) => (dispatch) => {
  setTimeout(
    () => dispatch({ type: authLogoutCreator() }),
    parseInt(expirationTime) * 1000
  );
};
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
      console.log(resp.data);
      localStorage.setItem("token", resp.data.idToken);
      const expiryTime = new Date(
        new Date().getTime() + resp.data.expiresIn * 1000
      );
      localStorage.setItem("expiry", expiryTime);
      localStorage.setItem("userid", resp.data.localId);
      dispatch(authSuccessCreator(resp.data.idToken, resp.data.localId));
      dispatch(authLogout(resp.data.expiresIn));
    })
    .catch((err) => dispatch(authFailureCreator(err.response.data.error)));
};
export const set_auth_redirect = (url) => ({
  type: actionTypes.SET_AUTH_REDIRECT,
  path: url,
});

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  if (!token) dispatch(authLogoutCreator());
  else {
    const expirationDate = new Date(localStorage.getItem("expiry"));
    if (expirationDate > new Date()) {
      dispatch(authSuccessCreator(token, userid));
      dispatch(
        authLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    } else {
      dispatch(authLogoutCreator());
    }
  }
};
