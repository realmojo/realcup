import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "/common/gtag";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {process.env.NODE_ENV === "production" ? (
            <>
              <script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522"
              ></script>
              <script
                type="text/javascript"
                src="//wcs.naver.net/wcslog.js"
              ></script>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `if(!wcs_add) var wcs_add = {};
                          wcs_add["wa"] = "b9c78635123e50";
                          if(window.wcs) {
                            wcs_do();
                          }`,
                }}
              ></script>
            </>
          ) : (
            ""
          )}
          <meta
            name="naver-site-verification"
            content="7e1ad1c66b1654568b6dbd28e66c4bb27b5e362b"
          />

          <meta
            name="description"
            content="누구나 즐길 수 있는 이상형 월드컵 사이트 리얼컵(Realcup) 입니다. 이상형 월드컵을 본인이 직접 만들고 친구들과 공유해보세요."
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://realcup.co.kr" />
          <meta property="og:article:author" content="Realcup" />
          <meta property="og:site_name" content="이상형 월드컵 - 리얼컵" />
          <meta property="og:title" content="이상형 월드컵 - 리얼컵" />
          <meta
            property="og:description"
            content="누구나 즐길 수 있는 이상형 월드컵 사이트 리얼컵(Realcup) 입니다. 이상형 월드컵을 본인이 직접 만들고 친구들과 공유해보세요."
          />
          <meta
            property="og:image"
            content="https://realcup.s3.ap-northeast-2.amazonaws.com/logo.png"
          />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@REALCUP" />
          <meta name="twitter:title" content="이상형 월드컵 - 리얼컵" />
          <meta
            name="twitter:description"
            content="누구나 즐길 수 있는 이상형 월드컵 사이트 리얼컵(Realcup) 입니다. 이상형 월드컵을 본인이 직접 만들고 친구들과 공유해보세요."
          />
          <meta
            property="twitter:image"
            content="https://realcup.s3.ap-northeast-2.amazonaws.com/logo.png"
          />
          <link rel="canonical" href="https://realcup.co.kr" />
          <link
            rel="apple-touch-icon"
            href="https://realcup.s3.ap-northeast-2.amazonaws.com/logo.png"
          />
          <meta charSet="utf-8" />
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#69c0ff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
