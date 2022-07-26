import type { AppProps } from "next/app";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

import { Layout } from "../components/Layout";
import Navbar from "../components/Navbar/Navbar";
import { MyUserContextProvider } from "../utils/useUser";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <Layout>
            <Navbar />
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
