<template>
 <section class="cnt-wrap">
  <PageTitle title="メモ一覧" />
  <div class="cnt-box">
   <div class="inner">
    <MemoList />
   </div>
   <!-- /.inner -->
  </div>
  <!-- /.cnt-box -->
 </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

// コンポーネント読み込み
import PageTitle from '~/components/parts/PageTitle.vue';
import MemoList from '~/components/parts/MemoList.vue';

export default {
 // コンポーネント設定
 components: {
  PageTitle: PageTitle,
  MemoList: MemoList
 },
 head: {
  title: 'mkDowner',
  titleTemplate: ''
 },
 data: function() {
  return {
   editor: null,
   editorText: ''
  };
 },
 // 各処理
 methods: {
  save: function() {
   const dbName = this.$store.state.db_info.dbName;
   const storeName = this.$store.state.db_info.table.t.memo.name;
   let dbVersion;

   var data = { id: 'A1', title: 'test', text: this.editor.value() };

   //　DB名を指定して接続（DBがなければ新規作成）
   let openReq = this.openDb(dbName);

   // DBのバージョン更新(DBの新規作成も含む)時に実行される処理
   openReq.onupgradeneeded = function(event) {
    let db = event.target.result;
    // オブジェクトストア（テーブル）を作成
    db.createObjectStore(storeName, { keyPath: 'id' });
   };
   //onupgradeneededの後に実行される処理（更新がない場合は本処理のみ実行）
   openReq.onsuccess = function(event) {
    var db = event.target.result;
    // 現在のバージョンを更新
    dbVersion = db.version;

    var trans = db.transaction(storeName, 'readwrite');
    var store = trans.objectStore(storeName);
    var putReq = store.put(data);

    // 接続を解除する
    db.close();
   };
   // エラー時の処理
   openReq.onerror = function(event) {};
  }
 },
 mounted: function() {
  const resInitDb = this.initDb();
  let self = this;

  resInitDb
   .then(data => {
    self.getDbAllDataTMemo();
   })
   .catch(data => {});
 }
};
</script>

<style></style>
