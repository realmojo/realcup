import React, { useEffect } from "react";
import "../styles/globals.css";
import "../styles/login.css";
import "../styles/footer.css";
import "../styles/create.css";
import "../styles/board.css";
import { storeLogin } from "../stores/login";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    storeLogin.initLogin();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
