import Head from 'next/head';
import Layout from '../components/common/layout';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import * as commonDb from '../lib/common_db';
import Editor from '../components/parts/editor';

const Edit = () => {
 let paramObj = {};
 if (typeof window !== 'undefined') {
  let param = window.location.search.substring(1).split('&');
  for (let i = 0, iLength = param.length; i < iLength; i = (i + 1) | 0) {
   const thisParam = param[i].split('=');
   if (thisParam.length === 2) {
    paramObj[thisParam[0]] = thisParam[1];
   }
  }
 }
 let id = -1;

 if (paramObj['id'] != null && paramObj['id'] !== '') {
  id = parseInt(paramObj['id'], 10);
 }

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
    <meta property="og:title" content={'編集 | ' + process.env.siteName} />
    <meta
     property="og:url"
     content={process.env.siteDomain + process.env.siteRootDir + '/edit/'}
    />
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">{data.id != null && <Editor data={data} />}</div>
    </div>
   </section>
  </Layout>
 );
};

export default Edit;
