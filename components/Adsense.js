import React from "react";
import AdSense from "react-adsense";

export const Adsense = ({ slotId, adFormat = "auto", style }) => {
  const isProduction = process.env.NODE_ENV === "production" ? true : false;
  return (
    <>
      {isProduction ? (
        <div className="text-center">
          <AdSense.Google
            style={style}
            client="ca-pub-9130836798889522"
            slot={slotId}
            format={adFormat}
            responsive="true"
          />
        </div>
      ) : (
        <div style={{ width: "100%", height: "90px", backgroundColor: "gray" }}>
          애드센스
        </div>
      )}
    </>
  );
};
