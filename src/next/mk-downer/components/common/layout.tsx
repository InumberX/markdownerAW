import Head from 'next/head';

import Header from './header';
import Footer from './footer';

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
