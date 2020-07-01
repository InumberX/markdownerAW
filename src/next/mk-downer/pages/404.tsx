import Head from 'next/head';
import Layout from '../components/common/layout';

const Custom404 = () => {
 return (
  <Layout>
   <Head>
    <title>お探しのページは見つかりませんでした | {process.env.siteName}</title>
   </Head>
   <div className="inner">404</div>
  </Layout>
 );
};

export default Custom404;
