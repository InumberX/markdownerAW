import * as utils from './utils';
import { isArray } from 'util';

/*------------------------------------------
 DB情報
--------------------------------------------*/
// DB名
export const dbName = 'mk_downer';
// テーブル名
export const dbTable = { tMemo: 't_memo' };
// DBバージョン
let dbVersion = 1;

/*------------------------------------------
 DBに接続（存在しなければ新規作成）する処理
--------------------------------------------*/
const openDb = (dbName, dbVersion) => {
 let result = null;
 if (dbVersion != null && dbVersion !== '') {
  result = indexedDB.open(dbName, dbVersion);
 } else {
  result = indexedDB.open(dbName);
 }
 return result;
};

/*------------------------------------------
 DBから全情報を取得する処理
--------------------------------------------*/
export const getDbAllData = (tableName) => {
 return new Promise((resolve, reject) => {
  let db;

  //　DB名を指定して接続（DBがなければ新規作成）
  const request = openDb(dbName, dbVersion);
  let result = [];

  request.onsuccess = (event) => {
   db = event.target.result;

   // 現在のバージョンを更新
   dbVersion = db.version;

   try {
    const transaction = db.transaction([tableName]);
    const objItem = transaction.objectStore(tableName);
    objItem.openCursor().onsuccess = (event) => {
     const row = event.target.result;
     if (row) {
      result.push(row.value);
      row.continue();
     } else {
      // 接続を解除する
      db.close();

      resolve(result);
     }
    };
   } catch (e) {
    // 接続を解除する
    db.close();

    reject('error');
   }
  };

  // エラー時の処理
  request.onerror = (event) => {
   // 接続を解除する
   db.close();

   reject('error');
  };
 });
};

/*------------------------------------------
 DBに新規登録する処理
--------------------------------------------*/
export const insertDbData = (data, tableName) => {
 return new Promise((resolve, reject) => {
  getDbAllData(dbTable.tMemo).then((res) => {
   data.id = res.length;
   const now = utils.getDateTime();
   data.create_date = now;
   data.update_date = now;

   setDbData(data, tableName)
    .then((res) => {
     resolve(res);
    })
    .catch((res) => {
     reject(res);
    });
  });
 }).catch((res) => {
  reject(res);
 });
};

/*------------------------------------------
 DBに登録されている情報を上書きする処理
--------------------------------------------*/
export const updateDbData = (data, tableName) => {
 const now = utils.getDateTime();
 data.update_date = now;
 return new Promise((resolve, reject) => {
  setDbData(data, tableName)
   .then((res) => {
    resolve(res);
   })
   .catch((res) => {
    reject(res);
   });
 });
};

/*------------------------------------------
 DBに情報を登録する処理
--------------------------------------------*/
const setDbData = (data, tableName) => {
 return new Promise((resolve, reject) => {
  let db;

  //　DB名を指定して接続（DBがなければ新規作成）
  const request = openDb(dbName, dbVersion);

  // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
  request.onupgradeneeded = (event) => {
   db = event.target.result;
   // オブジェクトストア（テーブル）を作成
   db.createObjectStore(tableName, { keyPath: 'id' });
  };

  //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
  request.onsuccess = (event) => {
   db = event.target.result;

   // 現在のバージョンを更新
   dbVersion = db.version;

   const trans = db.transaction(tableName, 'readwrite');
   const store = trans.objectStore(tableName);
   const result = store.put(data);

   // 接続を解除する
   db.close();

   resolve('success');
  };

  // エラー時の処理
  request.onerror = (event) => {
   // 接続を解除する
   db.close();

   reject('error');
  };
 });
};
