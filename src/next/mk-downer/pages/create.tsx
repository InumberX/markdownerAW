import Head from 'next/head';
import Layout from '../components/common/layout';

export default function Create() {
 return (
  <Layout>
   <Head>
    <title>新規作成 | {process.env.siteName}</title>
   </Head>
   <div className="inner">新規作成</div>
  </Layout>
 );
}
