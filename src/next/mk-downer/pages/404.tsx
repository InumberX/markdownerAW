import Head from 'next/head';
import Layout from '../components/common/layout';
import Link from 'next/link';

const Custom404 = () => {
 return (
  <Layout>
   <Head>
    <title>お探しのページが見つかりません | {process.env.siteName}</title>
    <meta
     property="og:title"
     content={'お探しのページが見つかりません | ' + process.env.siteName}
    />
    <meta
     property="og:url"
     content={process.env.siteDomain + process.env.siteRootDir + '/404/'}
    />
   </Head>
   <section className="cnt-wrap">
    <div className="inner">
     <div className="cnt-box">
      <div className="not-found">
       <div className="not-found_ttl-box">
        <h1 className="not-found_ttl">
         <em className="not-found_num">404</em>Not Found
        </h1>
       </div>
       <div className="not-found_tx-box">
        <p className="not-found_main-tx">
         お探しのページが見つかりません
         <br />
         ページは削除されたか、一時的にご利用できない可能性があります。
         <br />
         URLが正しいかどうかご確認ください。
        </p>
       </div>
       <div className="not-found_link-box">
        <Link href="/">
         <a className="sbmt-btn">トップに戻る</a>
        </Link>
       </div>
      </div>
     </div>
    </div>
   </section>
  </Layout>
 );
};

export default Custom404;
