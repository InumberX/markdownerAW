import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import * as commonDb from '../../lib/common_db';
import AdsenseList from './adsense_list';

let marked = null;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
 marked = require('marked');
}

const ShowMemo = (props) => {
 const [content, setContent] = useState('');

 useEffect(() => {
  if (props.data != null && props.data.content != null) {
   setContent(marked(props.data.content));
  }
 }, [props.data.content]);

 // 削除ボタン押下時の処理
 const deleteData = (id) => {
  if (window.confirm('メモを削除します。よろしいですか？')) {
   commonDb
    .deleteDbData(id, commonDb.dbTable.tMemo)
    .then((res) => {
     alert('メモの削除が完了しました。');
     Router.push('/');
    })
    .catch((res) => {
     alert('メモの削除に失敗しました。');
    });
  }
 };

 return (
  <div className="show-memo-box">
   {props.data.id != null && (
    <>
     <div className="show-memo">
      <div className="show-memo_ttl-box">
       <h2 className="show-memo_ttl">{props.data.title}</h2>
      </div>
      <div className="show-memo_info-and-btn-box">
       <div className="show-memo_info-box">
        <dl className="memo-list_info">
         <dt className="memo-list_info-ttl">更新</dt>
         <dd className="memo-list_info-cnt">
          {props.data.update_date.slice(0, -3)}
         </dd>
        </dl>
        <dl className="memo-list_info">
         <dt className="memo-list_info-ttl">作成</dt>
         <dd className="memo-list_info-cnt">
          {props.data.create_date.slice(0, -3)}
         </dd>
        </dl>
       </div>
       <div className="show-memo_btn-box">
        <ul className="memo-list-btn_items">
         <li className="memo-list-btn_item">
          <Link href={'/edit/?id=' + props.data.id}>
           <a className="memo-list_btn is-edit">
            <i className="icon is-pencil"></i>
            編集
           </a>
          </Link>
         </li>
         <li className="memo-list-btn_item">
          <button
           name="memo_delete"
           className="memo-list_btn is-delete"
           onClick={(e) => deleteData(props.data.id)}
          >
           <i className="icon is-bin"></i>
           削除
          </button>
         </li>
        </ul>
       </div>
      </div>
      <div className="show-memo_cnt">
       <div
        className="mkd-box"
        dangerouslySetInnerHTML={{ __html: content }}
       ></div>
       <aside className="ads-list-side">
        <AdsenseList />
       </aside>
      </div>
     </div>
    </>
   )}
  </div>
 );
};

export default ShowMemo;
