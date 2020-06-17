import * as actionTypes from "../actions/actionsTypes";
const initialState = {
  token: null,
  userid: null,
  error: null,
  loading: false,
  redirect_path: "/",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userid: action.userid,
        error: null,
        loading: false,
      };
    case actionTypes.AUTH_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userid: null,
      };
    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
        redirect_path: action.path,
      };
    default:
      return state;
  }
};

export default authReducer;
