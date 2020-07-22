import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
 return (
  <>
   <Head>
    <meta charSet="utf-8" />
    <meta
     name="viewport"
     content="width=device-width,initial-scale=1.0,minimum-scale=1.0,user-scalable=no,shrink-to-fit=no,viewport-fit=cover"
     key="viewport"
    />
    <script
     src={process.env.siteRootDir + '/sw.js' + process.env.cashBuster}
     async
     key="sw"
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
