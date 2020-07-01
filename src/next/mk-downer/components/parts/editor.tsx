import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

let SimpleMDE = null;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
 SimpleMDE = require('simplemde');
}

type Inputs = {
 title: string;
};

const Create = () => {
 useEffect(() => {
  let simplemde = new SimpleMDE({
   spellChecker: false,
   status: false,
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
          maxLength="100"
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
       <fieldset className="frm_txar-box">
        <label className="frm_lb">
         <textarea className="txar-editor-faker"></textarea>
        </label>
       </fieldset>
      </dd>
     </dl>
    </div>
    <div className="frm-btm-box">
     <div className="frm-btm-next-wrap">
      <div className="frm-btn-next">
       <button name="frm_sbmt" className="sbmt-btn">
        保存
       </button>
      </div>
      <div className="frm-btn-back">
       <button name="frm_back" className="back-btn">
        戻る
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Create;
