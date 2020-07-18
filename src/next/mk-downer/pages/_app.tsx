import React, { useState, useEffect } from 'react';
import '../styles/common.scss';
import { AppProps } from 'next/app';
import Router from 'next/router';
import * as gtag from '../lib/gtag';

Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

/*------------------------------------------
 画面の向きを判定
--------------------------------------------*/
function initOrientation() {
 // 画面の向きが存在する場合
 if (window.orientation != null) {
  document.body.classList.remove('not-orient');
  document.body.classList.add('orient');
  setOrientationClass();

  // 画面の向きが変わった時の処理を設定
  window.addEventListener('orientationchange', function () {
   // 向きが完全に切り替わってから処理を行う
   setTimeout(function () {
    setOrientationClass();
   }, 10);
  });
 }
 // 画面の向きが存在しない場合
 else {
  document.body.classList.remove('orient');
  document.body.classList.add('not-orient');
 }
}

// 画面の向きに応じてクラスを付与する処理
function setOrientationClass() {
 // 画面の角度を設定
 let orientation = window.orientation;
 // 付与するクラス
 const addClassName = {
  vertical: 'is-vertical',
  horizontal: 'is-horizontal',
 };

 const _body = document.body;

 // 縦画面時の処理
 if (orientation === 0) {
  _body.classList.remove(addClassName.horizontal);
  _body.classList.add(addClassName.vertical);
 }
 // 横画面時の処理
 else {
  _body.classList.remove(addClassName.vertical);
  _body.classList.add(addClassName.horizontal);
 }
}

const App = ({ Component, pageProps }: AppProps) => {
 useEffect(() => {
  initOrientation();
 }, []);

 return <Component {...pageProps} />;
};

export default App;
