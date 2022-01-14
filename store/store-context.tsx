import { createContext, Dispatch, useReducer } from "react";
import { Bakery } from "../lib/bakeries";

const defaultState: any = {};
export const StoreContext = createContext<Store>(defaultState);

export interface Store {
  dispatch: Dispatch<any>;
  state: State;
}

export interface State {
  latLong: string;
  bakeries: Bakery[];
}

export enum ACTION_TYPES {
  SET_LAT_LONG,
  SET_BAKERIES,
}

export interface Action {
  type: ACTION_TYPES;
  payload: State;
}

const storeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_BAKERIES: {
      return { ...state, bakeries: action.payload.bakeries };
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: any) => {
  const initialState: State = {
    latLong: "",
    bakeries: [],
  };

  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
