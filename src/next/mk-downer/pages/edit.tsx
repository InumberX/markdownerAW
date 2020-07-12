import Head from 'next/head';
import Layout from '../components/common/layout';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import * as commonDb from '../lib/common_db';
import Editor from '../components/parts/editor';

const Edit = ({ query }) => {
 const id = parseInt(query.id, 10);

 const [data, setData] = useState({ id: null });

 useEffect(() => {
  commonDb
   .getDbData(id, commonDb.dbTable.tMemo)
   .then((res) => {
    if (typeof res !== 'undefined') {
     setData(res);
    } else {
     console.log(res);
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
    <title>編集 | {process.env.siteName}</title>
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">{data.id != null && <Editor data={data} />}</div>
    </div>
   </section>
  </Layout>
 );
};

Edit.getInitialProps = ({ query }) => {
 return { query };
};

export default Edit;
