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
   id: '',
   editorTitle: ''
  };
 },
 // 各処理
 methods: {
  save: function() {
   this.setDbDataTMemo(this.id, this.editorTitle, this.editor.value());
  }
 },
 created: function() {
  if (
   this.$nuxt.$route.params.id != null &&
   this.$nuxt.$route.params.id !== ''
  ) {
   this.id = this.$nuxt.$route.params.id;
  }
 },
 mounted: function() {
  console.log(this.getDbDataTMemo(this.id));
  this.editor = new SimpleMDE({
   element: document.getElementById('EDITOR')
  });

  this.getDbAllDataTMemo();
 }
};
</script>

<style></style>
