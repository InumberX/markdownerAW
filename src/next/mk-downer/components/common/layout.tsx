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
    <meta
     name="description"
     content="マークダウンエディタ「mkDowner（マークダウナー）」です。マークダウン形式でのテキストの作成・保存ができます。"
    />
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
