<template>
 <div class="memo-list-box">
  <ul class="memo-list_items">
   <li
    class="memo-list_item"
    v-for="(item, i) in $store.state.db_info.table.t.memo.data"
    :key="item.id"
   >
    <div class="memo-list_cnt">
     <button class="memo-list_ttl-btn">
      <span class="memo-list_ttl-tx">{{ item.title }}</span>
     </button>
     <div class="memo-list_btn-box">
      <nuxt-link
       class="memo-list_btn is-edit"
       :to="{ name: 'edit-id', params: { id: item.id } }"
      >
       編集
      </nuxt-link>
      <button class="memo-list_btn is-del" @click="delData(item.id)">
       削除
      </button>
     </div>
    </div>
   </li>
  </ul>
 </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
 data: function() {
  return {};
 },
 // インスタンスが作成された後に実行する処理
 created: function() {},
 // インスタンスがマウントされた後に実行する処理
 mounted: function() {},
 // 各処理
 methods: {
  delData: function(id) {
   if (confirm('削除してよろしいですか？')) {
    this.deleteDbDataTMemo(id);
   }
  }
 },
 // 監視プロパティ
 watch: {},
 // 算出プロパティ
 computed: {}
};
</script>

<style lang="scss">
/* メモ一覧 ========== */

/* SP ===== */
.memo-list_items {
 display: flex;
 flex-wrap: wrap;
 margin: 0;
 padding: 0;
 list-style: none;
 > .memo-list_item:first-of-type {
  margin-top: 0;
 }
}
.memo-list_item {
 width: 100%;
 margin: 8px 0;
}

.memo-list_cnt {
 overflow: hidden;
 border-radius: 4px;
 display: block;
 width: 100%;
 height: 100%;
 box-sizing: border-box;
 background-color: $palette-white--1;
 border: 2px solid $palette-gray--1;
 box-shadow: 2px 2px 8px rgba($palette-black--1, 0.1);
}

.memo-list_ttl-btn,
a.memo-list_ttl-btn {
 display: block;
 text-align: left;
 margin: 0;
 padding: 12px;
 border: none;
 background-color: transparent;
 font-size: 1.4rem;
 line-height: 1.6;
 color: $palette-green--1;
 text-decoration: none;
 transition: 0.3s background-color;
 &:hover {
  background-color: $palette-green--3;
 }
}

.memo-list_btn-box {
 display: flex;
 border-top: 1px solid $palette-gray--1;
}

.memo-list_btn,
a.memo-list_btn {
 display: block;
 width: 50%;
 text-decoration: none;
 margin: 0;
 padding: 12px;
 border: none;
 background-color: transparent;
 font-size: 1.2rem;
 line-height: 1;
 text-align: center;
 color: $palette-black--1;
 transition: 0.3s color;
 &:hover {
  color: $palette-green--1;
 }
 &.is-del {
  border-left: 1px solid $palette-gray--1;
  &:hover {
   color: $palette-red--1;
  }
 }
}

/* PC ===== */
@media screen and (min-width: 768px) {
}
</style>
