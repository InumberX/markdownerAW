import Head from 'next/head';
import Layout from '../components/common/layout';

const Show = ({ query }) => {
 const id = query.id;
 return (
  <Layout>
   <Head>
    <title>閲覧 | {process.env.siteName}</title>
   </Head>
   <div className="inner">閲覧{id}</div>
  </Layout>
 );
};

Show.getInitialProps = ({ query }) => {
 return { query };
};

export default Show;
