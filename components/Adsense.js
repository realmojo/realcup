import React, { useEffect } from "react";

export const Adsense = ({ slotId, adFormat = "auto", height }) => {
  const isProduction = process.env.NODE_ENV === "production" ? true : false;

  useEffect(() => {
    try {
      if (isProduction) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {isProduction ? (
        // <div style={{ width: "100%", height: height ? height : "none"  }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", height: height ? height : "none" }}
          data-ad-client="ca-pub-9130836798889522"
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        // </div>
        <div style={{ width: "100%", height: 100, backgroundColor: "gray" }}>
          애드센스
        </div>
      )}
    </>
  );
};
