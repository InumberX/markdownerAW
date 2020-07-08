import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import * as utils from '../../lib/utils';

let SimpleMDE = null;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
 SimpleMDE = require('simplemde');
}

type Inputs = {
 title: string;
 content: string;
};

const Editor = (props) => {
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');

 useEffect(() => {
  let simplemde = new SimpleMDE({
   spellChecker: false,
   status: false,
   toolbar: [
    'heading',
    'bold',
    'italic',
    '|',
    'unordered-list',
    'ordered-list',
    '|',
    'table',
    '|',
    'quote',
    'code',
    '|',
    'link',
    'image',
    '|',
    'preview',
   ],
  });
  simplemde.codemirror.on('change', function () {
   setContent(simplemde.value());
  });
  return () => {
   simplemde.toTextArea();
   simplemde = null;
  };
 }, []);

 const { register, handleSubmit, watch, errors } = useForm<Inputs>({
  mode: 'onBlur',
 });

 return (
  <div className="editor-box">
   <div className="frm-box">
    <div className="frm">
     <dl className="frm_set">
      <dt className="frm_ttl">タイトル</dt>
      <dd className="frm_cnt">
       <fieldset className="frm_tx-box">
        <label className="frm_lb">
         <input
          type="text"
          name="title"
          maxLength={100}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={register({
           required: {
            value: true,
            message: 'タイトルは必須項目です',
           },
           maxLength: {
            value: 100,
            message: 'タイトルは100文字以内で入力してください',
           },
          })}
         />
        </label>
        {errors.title && <p className="frm_err-msg">{errors.title?.message}</p>}
       </fieldset>
      </dd>
     </dl>
     <dl className="frm_set">
      <dt className="frm_ttl">内容</dt>
      <dd className="frm_cnt">
       <fieldset className="frm_txar-box frm_editor-box">
        <label className="frm_lb">
         <textarea
          name="content"
          className="txar-editor-faker"
          value={content}
          onChange={(e) => setContent(e.target.value)}
         />
        </label>
       </fieldset>
      </dd>
     </dl>
    </div>
    <div className="frm-btm-box">
     <div className="frm-btm-next-wrap">
      <div className="frm-btn-next">
       <button
        name="frm_sbmt"
        className="sbmt-btn"
        onClick={() => save(props.id)}
       >
        保存
       </button>
      </div>
      <div className="frm-btn-back">
       <Link href="/">
        <a className="back-btn">戻る</a>
       </Link>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

// 保存ボタン押下時の処理
const save = (id) => {
 setDbDataTMemo({
  id: 0,
  title: 'aaa',
  text: 'bbb',
  create_date: utils.getDateTime(),
  update_date: utils.getDateTime(),
 });
 // Router.push('/');
};

//　DBに接続（存在しなければ新規作成）する処理
const openDb = (dbName, dbVersion) => {
 let result = null;
 if (dbVersion != null && dbVersion !== '') {
  result = indexedDB.open(dbName, dbVersion);
 } else {
  result = indexedDB.open(dbName);
 }
 return result;
};

// DBに情報を登録する処理
const setDbDataTMemo = (data) => {
 const dbName = 'mk_downer';
 const tableName = 't_memo';
 const dbVersion = 1;
 const now = utils.getDateTime();
 let db;

 //　DB名を指定して接続（DBがなければ新規作成）
 const request = openDb(dbName, dbVersion);

 // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
 request.onupgradeneeded = function (event) {
  db = event.target.result;
  // オブジェクトストア（テーブル）を作成
  db.createObjectStore(tableName, { keyPath: 'id' });
 };

 //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
 request.onsuccess = function (event) {
  db = event.target.result;

  // 現在のバージョンを更新
  // self.$store.commit('db_info/setDbVersion', db.version);

  const trans = db.transaction(tableName, 'readwrite');
  const store = trans.objectStore(tableName);
  const result = store.put(data);

  // 接続を解除する
  db.close();
 };

 // エラー時の処理
 request.onerror = function (event) {};
};

export default Editor;
