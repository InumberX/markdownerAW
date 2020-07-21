import Head from 'next/head';
import Layout from '../components/common/layout';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import * as commonDb from '../lib/common_db';
import ShowMemo from '../components/parts/show_memo';

const Show = () => {
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
    <meta
     property="og:title"
     content={'閲覧 | ' + process.env.siteName}
     key="ogTitle"
    />
    <meta
     property="og:url"
     content={process.env.siteDomain + process.env.siteRootDir + '/show/'}
     key="ogUrl"
    />
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

export default Show;
