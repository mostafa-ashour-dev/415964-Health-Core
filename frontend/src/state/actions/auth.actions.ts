import type { AuthState } from "../store";



type AUTH_ACTION_TYPE = "REGISTER" | "LOGIN" | "LOGOUT" | "SET_TOKEN";

export type Action = {
  type: AUTH_ACTION_TYPE;
  payload?: {data: AuthState["data"]};
};

export const login = (payload: Action["payload"]): Action => ({
  type: "LOGIN",
  payload,
});

export const logout = (): Action => ({
  type: "LOGOUT",
});

export const register = (payload: Action["payload"]): Action => ({
  type: "REGISTER",
  payload,
});

export const setToken = (payload: Action["payload"]): Action => ({
  type: "SET_TOKEN",
  payload: payload,
});
