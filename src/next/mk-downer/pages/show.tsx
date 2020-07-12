import Head from 'next/head';
import Layout from '../components/common/layout';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import * as commonDb from '../lib/common_db';
import ShowMemo from '../components/parts/show_memo';

const Show = ({ query }) => {
 const id = parseInt(query.id, 10);

 const [data, setData] = useState({});

 useEffect(() => {
  commonDb
   .getDbData(id, commonDb.dbTable.tMemo)
   .then((res) => {
    if (typeof res !== 'undefined') {
     setData(res);
    } else {
     Router.push('/404/');
    }
   })
   .catch((res) => {
    Router.push('/404/');
   });
  return () => {};
 }, []);

 return (
  <Layout>
   <Head>
    <title>閲覧 | {process.env.siteName}</title>
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">
      <ShowMemo data={data} />
     </div>
    </div>
   </section>
  </Layout>
 );
};

Show.getInitialProps = ({ query }) => {
 return { query };
};

export default Show;
