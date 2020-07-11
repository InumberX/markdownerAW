import Head from 'next/head';
import Layout from '../components/common/layout';
import MemoList from '../components/parts/memo_list';

const Index = () => {
 return (
  <Layout>
   <Head>
    <title>{process.env.siteName}</title>
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
