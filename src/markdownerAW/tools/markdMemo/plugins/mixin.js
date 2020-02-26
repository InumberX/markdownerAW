import Vue from 'vue';
import { mapState, mapMutations, mapActions } from 'vuex';

Vue.mixin({
 methods: {
  //　DBに接続（存在しなければ新規作成）する処理
  openDb(dbName) {
   return indexedDB.open(dbName);
  },
  // DBから全情報を取得する処理
  getDbAllDataTMemo() {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   let db;

   //　DB名を指定して接続（DBがなければ新規作成）
   const request = this.openDb(dbName, dbVersion);
   let self = this;

   request.onsuccess = function(event) {
    self.$store.commit('db_info/initDbDataTMemo');

    db = event.target.result;

    // 現在のバージョンを更新
    self.$store.commit('db_info/setDbVersion', db.version);

    const transaction = db.transaction([tableName]);
    const objItem = transaction.objectStore(tableName);
    objItem.openCursor().onsuccess = function(event) {
     const row = event.target.result;
     if (row) {
      self.$store.commit('db_info/setDbDataTMemo', row.value);
      row.continue();
     }
    };

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
   const result = new Promise((resolve, reject) => {
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
     const result = store.get(id);

     result.onsuccess = resolve(event);

     // 接続を解除する
     db.close();

     self.getDbAllDataTMemo();
    };

    // エラー時の処理
    request.onerror = function(event) {
     reject('Failed to open db');
    };
   });
   result.then(function(dbResult) {
    console.log(dbResult);
    return dbResult;
   });
  },
  // DBに情報を登録する処理
  setDbDataTMemo(id, title, text) {
   const dbName = this.$store.state.db_info.dbName;
   const tableName = this.$store.state.db_info.table.t.memo.name;
   const dbVersion = this.$store.state.db_info.dbVersion;
   let db;

   const data = {
    id: id,
    title: title,
    text: text
   };

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
  }
 }
});
