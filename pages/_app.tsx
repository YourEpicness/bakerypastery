import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import { createContext, useReducer } from "react";

const StoreContext = createContext({});

const ACTION_TYPES = {
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <div className="font-sans">
        <Component {...pageProps} />
        <Footer />
      </div>
    </StoreProvider>
  );
}
export default MyApp;
