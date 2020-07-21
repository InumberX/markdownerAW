import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

/*------------------------------------------
 スムーススクロール
--------------------------------------------*/
let SmoothScroll = null;
let smoothScroll = null;

const smoothScrollOption = {
 // スクロール位置をずらす距離
 offset: 20,
 // URLを書き換えるかどうか
 updateURL: false,
 // スクロール速度（1000pxのスクロールにかかる時間をミリ秒単位で指定）
 speed: 300,
 // スクロール距離を無視するかどうか
 speedAsDuration: true,
};

function scrollToTop(e) {
 e.preventDefault();
 smoothScroll.animateScroll(document.body, '', smoothScrollOption);
 return false;
}

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
 SmoothScroll = require('smooth-scroll');
}

const Header = () => {
 const router = useRouter();
 const pathName = router.pathname;

 useEffect(() => {
  smoothScroll = new SmoothScroll();
 }, []);

 return (
  <header className="hd-wrap">
   <div className="hd">
    <div className="hd_logo-box">
     <div className="inner">
      <div className="hd-logo">
       <Link href="/">
        <a className="hd-logo_link">
         <img
          src={`${process.env.siteRootDir}/img/img_logo.svg`}
          className="hd-logo_img"
          alt={`${process.env.siteRootDir}`}
          width="160px"
          height="40px"
         />
        </a>
       </Link>
      </div>
     </div>
    </div>
    <div className="hd_menu-box">
     <div className="hd-menu">
      <ul className="hd-menu_items">
       <li className="hd-menu_item">
        <Link href="/">
         <a
          className={
           pathName === '/' || pathName === `${process.env.siteRootDir}/`
            ? 'hd-menu_link is-current'
            : 'hd-menu_link'
          }
         >
          <i className="icon is-list hd-menu_icon"></i>
          <span className="hd-menu_tx">一覧</span>
         </a>
        </Link>
       </li>
       <li className="hd-menu_item">
        <Link href="/create/">
         <a
          className={
           pathName === '/create' ||
           pathName === `${process.env.siteRootDir}/create/`
            ? 'hd-menu_link is-current'
            : 'hd-menu_link'
          }
         >
          <i className="styl-icon is-plus hd-menu_icon"></i>
          <span className="hd-menu_tx">作成</span>
         </a>
        </Link>
       </li>
      </ul>
      <div className="hd_page-top-box">
       <a
        href="#"
        className="hd_page-top-link"
        onClick={scrollToTop}
        title="トップへ戻る"
        aria-label="トップへ戻る"
       >
        <i className="styl-icon is-arrow is-up"></i>
       </a>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
