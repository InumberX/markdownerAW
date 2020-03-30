import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';

Vue.mixin({
 methods: {
  //　DBに接続（存在しなければ新規作成）する処理
  openDb(dbName, dbVersion) {
   let result = null;
   if (dbVersion != null && dbVersion !== '') {
    result = indexedDB.open(dbName, dbVersion);
   } else {
    result = indexedDB.open(dbName);
   }
   return result;
  },
  // 初期表示時の処理
  initDb() {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   return new Promise((resolve, reject) => {
    const req = this.openDb(dbName);
    let self = this;

    // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
    req.onupgradeneeded = function(e) {
     db = e.target.result;
     // オブジェクトストア（テーブル）を作成
     db.createObjectStore(tableName, { keyPath: 'id' });
    };

    //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
    req.onsuccess = function(e) {
     db = e.target.result;

     // 現在のバージョンを更新
     self.$store.commit('db_info/setDbVersion', db.version);

     // 接続を解除する
     db.close();

     resolve('success');
    };

    // エラー時の処理
    req.onerror = function(e) {
     reject('failed');
    };
   });
  },
  // DBから全情報を取得する処理
  getDbAllDataTMemo() {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   const req = this.openDb(dbName, dbVersion);
   let self = this;

   req.onsuccess = function(event) {
    self.$store.commit('db_info/initDbDataTMemo');

    db = event.target.result;

    // 現在のバージョンを更新
    self.$store.commit('db_info/setDbVersion', db.version);

    try {
     const transaction = db.transaction([tableName]);
     const objItem = transaction.objectStore(tableName);
     objItem.openCursor().onsuccess = function(event) {
      const row = event.target.result;
      if (row) {
       self.$store.commit('db_info/setDbDataTMemo', row.value);
       row.continue();
      }
     };
    } catch (e) {
     console.log(e);
     self.$store.commit('db_info/initDbDataTMemo');
    }

    // 接続を解除する
    db.close();
   };
  },
  // DBから情報を取得する処理
  getDbDataTMemo(id) {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   return new Promise((resolve, reject) => {
    const request = this.openDb(dbName, dbVersion);
    let self = this;

    // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
    request.onupgradeneeded = function(event) {
     db = event.target.result;
     // オブジェクトストア（テーブル）を作成
     db.createObjectStore(tableName, { keyPath: 'id' });
    };

    //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
    request.onsuccess = function(event) {
     db = event.target.result;

     // 現在のバージョンを更新
     self.$store.commit('db_info/setDbVersion', db.version);

     const trans = db.transaction(tableName, 'readwrite');
     const store = trans.objectStore(tableName);
     const req = store.get(id);

     req.onsuccess = () => resolve(req.result);

     // 接続を解除する
     db.close();

     self.getDbAllDataTMemo();
    };

    // エラー時の処理
    request.onerror = function(event) {
     reject('Failed to open db');
    };
   });
  },
  // DBに新規登録する処理
  insertDbDataTMemo(data) {
   const now = this.getDateTime();
   data.create_date = now;
   data.update_date = now;
   this.setDbDataTMemo(data);
  },
  // DBに登録されている情報を上書きする処理
  updateDbDataTMemo(data) {
   const now = this.getDateTime();
   data.update_date = now;
   this.setDbDataTMemo(data);
  },
  // DBに情報を登録する処理
  setDbDataTMemo(data) {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   const now = this.getDateTime();
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   const request = this.openDb(dbName, dbVersion);
   let self = this;

   // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
   request.onupgradeneeded = function(event) {
    db = event.target.result;
    // オブジェクトストア（テーブル）を作成
    db.createObjectStore(tableName, { keyPath: 'id' });
   };

   //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
   request.onsuccess = function(event) {
    db = event.target.result;

    // 現在のバージョンを更新
    self.$store.commit('db_info/setDbVersion', db.version);

    const trans = db.transaction(tableName, 'readwrite');
    const store = trans.objectStore(tableName);
    const result = store.put(data);

    // 接続を解除する
    db.close();

    self.getDbAllDataTMemo();
   };

   // エラー時の処理
   request.onerror = function(event) {};
  },
  // DBの情報を削除する処理
  deleteDbDataTMemo(id) {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   const request = this.openDb(dbName, dbVersion);
   let self = this;

   // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
   request.onupgradeneeded = function(event) {
    db = event.target.result;
    // オブジェクトストア（テーブル）を作成
    db.createObjectStore(tableName, { keyPath: 'id' });
   };

   //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
   request.onsuccess = function(event) {
    db = event.target.result;

    // 現在のバージョンを更新
    self.$store.commit('db_info/setDbVersion', db.version);

    const trans = db.transaction(tableName, 'readwrite');
    const store = trans.objectStore(tableName);
    const result = store.delete(id);

    // 接続を解除する
    db.close();

    self.getDbAllDataTMemo();
   };

   // エラー時の処理
   request.onerror = function(event) {};
  },
  // 現在日時を取得する処理
  getDateTime() {
   const now = new Date();
   const year = now.getFullYear();
   const month = this.zeroPadding(now.getMonth() + 1, 2);
   const date = this.zeroPadding(now.getDate(), 2);
   const hours = this.zeroPadding(now.getHours(), 2);
   const minutes = this.zeroPadding(now.getMinutes(), 2);
   const seconds = this.zeroPadding(now.getSeconds(), 2);
   const nowDate =
    year +
    '/' +
    month +
    '/' +
    date +
    ' ' +
    hours +
    ':' +
    minutes +
    ':' +
    seconds;
   return nowDate;
  },
  // 0埋めを行う処理
  zeroPadding(num, length) {
   let zero = '';
   for (let i = 0; i < length; i = (i + 1) | 0) {
    zero += '0';
   }
   return (zero + num).slice(-length);
  }
 }
});
