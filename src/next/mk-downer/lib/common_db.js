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

  // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
  request.onupgradeneeded = (e) => {
   db = e.target.result;
   // オブジェクトストア（テーブル）を作成
   db.createObjectStore(tableName, { keyPath: 'id' });
  };

  request.onsuccess = (e) => {
   db = e.target.result;

   // 現在のバージョンを更新
   dbVersion = db.version;

   try {
    const transaction = db.transaction([tableName]);
    const objItem = transaction.objectStore(tableName);
    objItem.openCursor().onsuccess = (e) => {
     const row = e.target.result;
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
  request.onerror = (e) => {
   // 接続を解除する
   db.close();

   reject('error');
  };
 });
};

/*------------------------------------------
 DBから情報を取得する処理
--------------------------------------------*/
export const getDbData = (id, tableName) => {
 return new Promise((resolve, reject) => {
  let db;

  //　DB名を指定して接続（DBがなければ新規作成）
  const request = openDb(dbName, dbVersion);

  // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
  request.onupgradeneeded = (e) => {
   db = e.target.result;
   // オブジェクトストア（テーブル）を作成
   db.createObjectStore(tableName, { keyPath: 'id' });
  };

  //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
  request.onsuccess = (e) => {
   db = e.target.result;

   // 現在のバージョンを更新
   dbVersion = db.version;

   const trans = db.transaction(tableName, 'readwrite');
   const store = trans.objectStore(tableName);
   const result = store.get(id);

   result.onsuccess = (e) => {
    // 接続を解除する
    db.close();
    resolve(e.target.result);
   };

   result.onerror = (e) => {
    // 接続を解除する
    db.close();
    reject('error');
   };
  };

  // エラー時の処理
  request.onerror = (e) => {
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
   if (res.length === 0) {
    data.id = 0;
   } else {
    data.id = res[res.length - 1].id + 1;
   }
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
  request.onupgradeneeded = (e) => {
   db = e.target.result;
   // オブジェクトストア（テーブル）を作成
   db.createObjectStore(tableName, { keyPath: 'id' });
  };

  //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
  request.onsuccess = (e) => {
   db = e.target.result;

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
  request.onerror = (e) => {
   // 接続を解除する
   db.close();

   reject('error');
  };
 });
};

/*------------------------------------------
 DBの情報を削除する処理
--------------------------------------------*/
export const deleteDbData = (id, tableName) => {
 return new Promise((resolve, reject) => {
  let db;

  //　DB名を指定して接続（DBがなければ新規作成）
  const request = openDb(dbName, dbVersion);

  // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
  request.onupgradeneeded = (e) => {
   db = e.target.result;
   // オブジェクトストア（テーブル）を作成
   db.createObjectStore(tableName, { keyPath: 'id' });
  };

  //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
  request.onsuccess = (e) => {
   db = e.target.result;

   // 現在のバージョンを更新
   dbVersion = db.version;

   const trans = db.transaction(tableName, 'readwrite');
   const store = trans.objectStore(tableName);
   const result = store.delete(id);

   // 接続を解除する
   db.close();

   resolve('success');
  };

  // エラー時の処理
  request.onerror = (e) => {
   // 接続を解除する
   db.close();

   reject('error');
  };
 });
};
