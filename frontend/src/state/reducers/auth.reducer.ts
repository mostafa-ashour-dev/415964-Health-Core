import type { Action } from "../actions/auth.actions";
import type { AuthState } from "../store";

const authReducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "REGISTER":
    case "LOGIN":
      return {
        ...state,
        data: action.payload.data,
      };

    case "LOGOUT":
      return {
        ...state,
        data: {
          user: null,
          token: null,
        },
      };

    case "SET_TOKEN":
      return {
        ...state,
        data: state.data
          ? { ...state.data, token: action.payload.data.token }
          : { user: null, token: action.payload.data.token },
      };

    default:
      return state;
  }
};

export default authReducer;
