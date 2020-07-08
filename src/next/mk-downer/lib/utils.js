/*------------------------------------------
 現在日時を取得
--------------------------------------------*/
export const getDate = (tx) => {
 let now = new Date();
 if (tx != null && tx !== '') {
  now = new Date(tx);
 }
 const year = now.getFullYear();
 const month = zeroPadding(now.getMonth() + 1, 2);
 const date = zeroPadding(now.getDate(), 2);
 const nowDate = year + '/' + month + '/' + date;
 return nowDate;
};

export const getDateTime = (tx) => {
 let now = new Date();
 if (tx != null && tx !== '') {
  now = new Date(tx);
 }
 const year = now.getFullYear();
 const month = zeroPadding(now.getMonth() + 1, 2);
 const date = zeroPadding(now.getDate(), 2);
 const hours = zeroPadding(now.getHours(), 2);
 const minutes = zeroPadding(now.getMinutes(), 2);
 const seconds = zeroPadding(now.getSeconds(), 2);
 const nowDate =
  year + '/' + month + '/' + date + ' ' + hours + ':' + minutes + ':' + seconds;
 return nowDate;
};

/*------------------------------------------
 0埋め
--------------------------------------------*/
export const zeroPadding = (num, length) => {
 let zero = '';
 for (let i = 0; i < length; i = (i + 1) | 0) {
  zero += '0';
 }
 return (zero + num).slice(-length);
};

/*------------------------------------------
 特定のクラス名が存在するか確認する処理
--------------------------------------------*/
export const isClass = (target, targetClass) => {
 let result = false;
 const classArray = target.classList;
 for (let i = 0, iLength = classArray.length; i < iLength; i = (i + 1) | 0) {
  if (targetClass === classArray[i]) {
   result = true;
   break;
  }
 }
 return result;
};
