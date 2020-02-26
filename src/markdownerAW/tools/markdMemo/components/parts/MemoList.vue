<template>
 <div class="memo-list-box">
  <ul class="memo-list_items">
   <li
    class="memo-list_item"
    v-for="(item, i) in $store.state.db_info.table.t.memo.data"
    v-bind:key="item.id"
   >
    <nuxt-link
     class="memo-list_link"
     v-bind:to="{ name: 'edit-id', params: { id: item.id } }"
     >{{ item.title }}</nuxt-link
    >
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
 methods: {},
 // 監視プロパティ
 watch: {},
 // 算出プロパティ
 computed: {}
};
</script>

<style lang="scss">
/* メモ一覧 ========== */

/* SP ===== */
.memo-list-box {
 border-radius: 16px;
 background: $color-bg--body;
 box-shadow: 4px 4px 8px #c8c9cc, -4px -4px 8px #ffffff;
}

/* PC ===== */
@media screen and (min-width: 768px) {
}
</style>
