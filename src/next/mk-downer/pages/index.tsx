import Head from 'next/head';
import Layout from '../components/common/layout';
import MemoList from '../components/parts/memo_list';

const Index = () => {
 return (
  <Layout>
   <Head>
    <title>{process.env.siteName}</title>
    <meta property="og:title" content={process.env.siteName} />
    <meta
     property="og:url"
     content={process.env.siteDomain + process.env.siteRootDir + '/'}
    />
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">
      <MemoList />
     </div>
    </div>
   </section>
  </Layout>
 );
};

export default Index;
