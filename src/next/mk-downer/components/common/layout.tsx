import Head from 'next/head';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
 return (
  <>
   <Head>
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
