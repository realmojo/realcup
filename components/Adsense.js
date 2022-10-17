import React from "react";
import AdSense from "react-adsense";

export const Adsense = ({ slotId, adFormat, style, isResponsive = true }) => {
  const isProduction = process.env.NODE_ENV === "production" ? true : false;
  return (
    <>
      {isProduction ? (
        <div className="text-center">
          <AdSense.Google
            style={style}
            slot={slotId}
            client="ca-pub-9130836798889522"
            format={adFormat ? adFormat : ""}
            responsive={isResponsive}
          />
        </div>
      ) : (
        <div
          style={{ width: "100%", height: "90px", backgroundColor: "#2d3436" }}
        >
          애드센스
        </div>
      )}
    </>
  );
};
