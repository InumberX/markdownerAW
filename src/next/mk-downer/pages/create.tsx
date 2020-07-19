import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/common/layout';
import Editor from '../components/parts/editor';

const Create = () => {
 return (
  <Layout>
   <Head>
    <title>新規作成 | {process.env.siteName}</title>
    <meta property="og:title" content={'新規作成 | ' + process.env.siteName} />
    <meta
     property="og:url"
     content={process.env.siteDomain + process.env.siteRootDir + '/create/'}
    />
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">
      <Editor />
     </div>
    </div>
   </section>
  </Layout>
 );
};

export default Create;
