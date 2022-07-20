import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Layout } from "../components/Layout";
import { Navbar } from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Navbar />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
