import "../styles/globals.css";
import type { AppProps } from "next/app";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="font-sans">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
export default MyApp;
