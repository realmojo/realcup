import React, { useEffect } from "react";
import "../styles/globals.css";
import "../styles/login.css";
import "../styles/footer.css";
import "../styles/create.css";
import "../styles/board.css";
import { storeLogin } from "../stores/login";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    storeLogin.initLogin();
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
