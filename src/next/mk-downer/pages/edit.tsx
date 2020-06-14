import Head from 'next/head';
import Layout from '../components/common/layout';

const Edit = ({ query }) => {
 const id = query.id;
 return (
  <Layout>
   <Head>
    <title>編集 | {process.env.siteName}</title>
   </Head>
   <div className="inner">編集{id}</div>
  </Layout>
 );
};

Edit.getInitialProps = ({ query }) => {
 return { query };
};

export default Edit;
