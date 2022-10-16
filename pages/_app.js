import React, { useEffect } from "react";
import "../styles/globals.css";
import "../styles/login.css";
import "../styles/footer.css";
import "../styles/create.css";
import "../styles/board.css";
import { storeLogin } from "../stores/login";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    storeLogin.initLogin();
  }, []);
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
