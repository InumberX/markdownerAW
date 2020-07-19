import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import { GA_TRACKING_ID } from '../../lib/gtag';

const Layout = ({ children }: { children: React.ReactNode }) => {
 return (
  <>
   <Head>
    <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0,minimum-scale=1.0,user-scalable=no,shrink-to-fit=no,viewport-fit=cover"
    />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="description" content={process.env.siteDescription} />
    <meta property="og:type" content="website" />
    <meta
     property="og:image"
     content={
      process.env.siteDomain + process.env.siteRootDir + '/img/img_og.png'
     }
    />
    <meta property="og:site_name" content={process.env.siteName} />
    <meta property="og:description" content={process.env.siteDescription} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@InumberX" />
    <meta name="twitter:description" content={process.env.siteDescription} />
    <link rel="icon" href={process.env.siteRootDir + '/img/favicon.ico'} />
    <link
     rel="apple-touch-icon"
     href={process.env.siteRootDir + '/img/favicon_180.png'}
    />
    <script
     async
     src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
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
    />
   </Head>
   <div className="wrap-all">
    <Header></Header>
    <main className="mn-wrap">{children}</main>
    <Footer></Footer>
   </div>
  </>
 );
};

export default Layout;
