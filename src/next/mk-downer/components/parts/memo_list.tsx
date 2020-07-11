import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import * as commonDb from '../../lib/common_db';

const MemoList = () => {
 const [memoList, setMemoList] = useState([]);
 const [flgGetData, setFlgGetData] = useState(false);

 useEffect(() => {
  commonDb
   .getDbAllData(commonDb.dbTable.tMemo)
   .then((res) => {
    setMemoList(res);
    setFlgGetData(true);
   })
   .catch((res) => {});
  return () => {
   setMemoList([]);
   setFlgGetData(false);
  };
 }, []);

 return (
  <div className="memo-list-box">
   {flgGetData && memoList.length === 0 && (
    <div className="empty-mes-box" key="empty-mes">
     <div className="empty-mes_tx-box">
      <p className="empty-mes_tx">
       あなたはまだメモを作成していません。
       <br />
       さっそく1件目のメモを作成してみましょう！
      </p>
     </div>
     <div className="empty-mes_btn-box">
      <Link href="/create/">
       <a className="sbmt-btn">
        <i className="styl-icon is-plus hd-menu_icon"></i>
        新規作成
       </a>
      </Link>
     </div>
    </div>
   )}
   {flgGetData && memoList.length > 0 && <MemoListItem data={memoList} />}
  </div>
 );
};

const MemoListItem = (props) => {
 let result = null;
 let items = [];

 if (props.data.length > 0) {
  for (let i = 0, iLength = props.data.length; i < iLength; i = (i + 1) | 0) {
   const thisData = props.data[i];
   items.push(
    <li className="memo-list_item" key={thisData.id}>
     <div className="memo-list">
      <div className="memo-list_ttl-box">
       <h2 className="memo-list_ttl">{thisData.title}</h2>
      </div>
      <div className="memo-list_tx-box">
       <p className="memo-list_tx">
        <MemoListContent data={thisData.content} />
       </p>
      </div>
      <div className="memo-list_info-box">
       <dl className="memo-list_info">
        <dt className="memo-list_info-ttl">更新</dt>
        <dd className="memo-list_info-cnt">{thisData.update_date}</dd>
       </dl>
       <dl className="memo-list_info">
        <dt className="memo-list_info-ttl">作成</dt>
        <dd className="memo-list_info-cnt">{thisData.create_date}</dd>
       </dl>
      </div>
      <div className="memo-list_btn-box">
       <ul className="memo-list-btn_items">
        <li className="memo-list-btn_item">
         <Link href="/create/">
          <a className="memo-list_btn is-show">
           <i className="icon is-eye"></i>
           閲覧
          </a>
         </Link>
        </li>
        <li className="memo-list-btn_item">
         <Link href="/create/">
          <a className="memo-list_btn is-edit">
           <i className="icon is-pencil"></i>
           編集
          </a>
         </Link>
        </li>
        <li className="memo-list-btn_item">
         <button name="memo_delete" className="memo-list_btn is-delete">
          <i className="icon is-bin"></i>
          削除
         </button>
        </li>
       </ul>
      </div>
     </div>
    </li>
   );
  }
  result = (
   <ul className="memo-list_items" key="memo-list">
    {items}
   </ul>
  );
 }

 return result;
};

const MemoListContent = (props) => {
 let result = null;
 let items = [];
 const content = props.data.replace(/\r?\n/g, '<br>').split('<br>');

 if (content.length > 0) {
  for (let i = 0, iLength = content.length; i < iLength; i = (i + 1) | 0) {
   items.push(
    <React.Fragment key={i}>
     {content[i]}
     <br />
    </React.Fragment>
   );
  }
  result = <>{items}</>;
 }

 return result;
};

export default MemoList;
