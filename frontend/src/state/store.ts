import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Action } from "./actions/auth.actions";
import authReducer from "./reducers/auth.reducer";
import type { UserType } from "../types/user.types";


const secureStorage = {
  getItem: (name: string) => {
    const value = sessionStorage.getItem(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    sessionStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};


export type AuthState = {
  data: {
    user: UserType| null;
    token: string | null; 
  } | null;
  dispatch: (action: Action) => void;
};

const initialState: AuthState = {
  data: {
    user: null,
    token: null,
  },
  dispatch: () => {},
};

const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action) => set((state) => authReducer(state, action)),
    }),
    {
      name: "auth-state",
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        data: state.data
          ? {
              user: state.data.user,
              token: state.data.token,
            }
          : null,
      }),
    },
  ),
);

export default useAuth;
