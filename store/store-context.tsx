import { createContext, useReducer } from "react";

const defaultState: any = {};
export const StoreContext = createContext(defaultState);

export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_BAKERIES: "SET_BAKERIES",
};

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_BAKERIES: {
      return { ...state, bakeries: action.payload.bakeries };
    }
    default:
      throw new Error(`Unahndled action type: ${action.type}`);
  }
};

const StoreProvider = ({ children }: any) => {
  const initialState = {
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
