import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Router from 'next/router';
import * as commonDb from '../../lib/common_db';

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
 const [flgEdit, setFlgEdit] = useState(false);

 useEffect(() => {
  if (
   props.data != null &&
   props.data.content != null &&
   props.data.content !== ''
  ) {
   setContent(props.data.content);
  }

  let simplemde = new SimpleMDE({
   element: document.getElementById('simplemde'),
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

  if (
   props.data != null &&
   props.data.title != null &&
   props.data.title !== ''
  ) {
   setFlgEdit(true);
   setTitle(props.data.title);
  }

  if (
   props.data != null &&
   props.data.content != null &&
   props.data.content !== ''
  ) {
   simplemde.value(props.data.content);
  }

  return () => {
   simplemde.toTextArea();
   simplemde = null;
  };
 }, [props.data]);

 const { register, handleSubmit, watch, errors } = useForm<Inputs>({
  mode: 'onBlur',
 });

 // 保存ボタン押下時の処理
 const save = (data, e) => {
  if (!flgEdit) {
   commonDb
    .insertDbData(
     {
      title: data.title,
      content: data.content,
     },
     commonDb.dbTable.tMemo
    )
    .then((res) => {
     Router.push('/');
    })
    .catch((res) => {
     alert('保存に失敗しました');
    });
  } else {
   commonDb
    .updateDbData(
     {
      id: props.data.id,
      title: data.title,
      content: data.content,
      create_date: props.data.create_date,
      update_date: props.data.update_date,
     },
     commonDb.dbTable.tMemo
    )
    .then((res) => {
     alert('保存が完了しました');
    })
    .catch((res) => {
     alert('保存に失敗しました');
    });
  }
 };

 return (
  <div className="editor-box">
   <form onSubmit={handleSubmit(save)}>
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
         {errors.title && (
          <p className="frm_err-msg">{errors.title?.message}</p>
         )}
        </fieldset>
       </dd>
      </dl>
      <dl className="frm_set">
       <dt className="frm_ttl">内容</dt>
       <dd className="frm_cnt">
        <fieldset className="frm_txar-box frm_editor-box">
         <label className="frm_lb">
          <textarea
           id="simplemde"
           name="content"
           className="txar-editor-faker"
           value={content}
           onChange={(e) => setContent(e.target.value)}
           ref={register({})}
          />
         </label>
        </fieldset>
       </dd>
      </dl>
     </div>
     <div className="frm-btm-box">
      <div className="frm-btm-next-wrap">
       <div className="frm-btn-next">
        <button type="submit" name="frm_sbmt" className="sbmt-btn">
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
   </form>
  </div>
 );
};

export default Editor;
