<template>
 <div class="contents-wrap">
  <input type="text" v-model="editorTitle" placeholder="タイトル" />
  <div class="editor-box">
   <textarea id="EDITOR"></textarea>
  </div>
  <button v-on:click="save()">保存</button>
 </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
 head: {
  title: 'markdMemo',
  titleTemplate: ''
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
   this.setDbDataTMemo(
    ('000000' + (this.$store.state.db_info.table.t.memo.data.length + 1)).slice(
     -6
    ),
    this.editorTitle,
    this.editor.value()
   );
  }
 },
 mounted: function() {
  this.editor = new SimpleMDE({
   element: document.getElementById('EDITOR')
  });

  this.getDbAllDataTMemo();
 }
};
</script>

<style></style>
