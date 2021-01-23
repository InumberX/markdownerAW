import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { GA_TRACKING_ID } from '../lib/gtag';

class Document extends NextDocument {
 render() {
  return (
   <Html lang="ja">
    <Head>
     <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="xUaCompatible" />
     <meta
      name="format-detection"
      content="telephone=no"
      key="formatDetection"
     />
     <meta
      name="description"
      content={process.env.siteDescription}
      key="description"
     />
     <meta property="og:type" content="website" key="ogType" />
     <meta
      property="og:image"
      content={
       process.env.siteDomain + process.env.siteRootDir + '/img/img_og.png'
      }
      key="ogImage"
     />
     <meta
      property="og:site_name"
      content={process.env.siteName}
      key="ogSiteName"
     />
     <meta
      property="og:description"
      content={process.env.siteDescription}
      key="ogDescription"
     />
     <meta
      name="twitter:card"
      content="summary_large_image"
      key="twitterCard"
     />
     <meta name="twitter:site" content="@InumberX" key="twitterSite" />
     <meta
      name="twitter:description"
      content={process.env.siteDescription}
      key="twitterDescription"
     />
     <link
      rel="icon"
      href={process.env.siteRootDir + '/img/favicon.ico'}
      key="icon"
     />
     <link
      rel="apple-touch-icon"
      href={process.env.siteRootDir + '/img/favicon_180.png'}
      key="appleTouchIcon"
     />
     {/*}
     <script
      data-ad-client="ca-pub-6711167987812480"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      key="ads"
     ></script>
     */}
     <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      key="ga"
     />
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
      key="gaScript"
     />
     <link
      rel="manifest"
      href={process.env.siteRootDir + '/manifest.json' + process.env.cashBuster}
      key="manifest"
     />
     <meta name="theme-color" content="#0070f3" key="themeColor" />
    </Head>
    <body>
     <Main />
     <NextScript />
    </body>
   </Html>
  );
 }
}

export default Document;
