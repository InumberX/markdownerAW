export const state = () => ({
 // DBバージョン
 dbVersion: 1,
 // DB名
 dbName: 'markd_memo_db',
 // オブジェクトストア（テーブル）
 table: {
  t: {
   memo: {
    name: 't_memo',
    data: []
   }
  }
 }
});

export const mutations = {
 // DBバージョン更新
 setDbVersion(state, value) {
  state.dbVersion = value;
 },
 // DBデータ初期化
 initDbDataTMemo(state) {
  state.table.t.memo.data = [];
 },
 // DBデータ更新
 setDbDataTMemo(state, value) {
  state.table.t.memo.data.push(value);
 }
};
