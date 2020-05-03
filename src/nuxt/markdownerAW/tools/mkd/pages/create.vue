<template>
 <section class="cnt-wrap">
  <PageTitle title="新規作成" />
  <input type="text" v-model="editorTitle" placeholder="タイトル" />
  <div class="editor-box">
   <textarea id="editor"></textarea>
  </div>
  <button v-on:click="save()">保存</button>
 </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import PageTitle from '~/components/parts/PageTitle.vue';

export default {
 head: {
  title: '新規作成'
 },
 components: {
  PageTitle: PageTitle
 },
 data: function() {
  return {
   editor: null,
   editorTitle: ''
  };
 },
 // 各処理
 methods: {
  save: function() {
   const data = {
    id: this.$store.state.db_info.table.t.memo.data.length + 1,
    title: this.editorTitle,
    text: this.editor.value()
   };
   this.insertDbDataTMemo(data);
  }
 },
 mounted: function() {
  this.editor = new SimpleMDE({
   element: document.getElementById('editor')
  });

  this.getDbAllDataTMemo();
 }
};
</script>

<style></style>
