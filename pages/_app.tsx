import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";
import StoreProvider from "../store/store-context";

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
