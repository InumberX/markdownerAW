<template>
 <section class="cnt-wrap">
  <PageTitle title="編集" />
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
  title: '編集'
 },
 components: {
  PageTitle: PageTitle
 },
 data: function() {
  return {
   editor: null,
   id: '',
   editorTitle: '',
   createDate: ''
  };
 },
 // 各処理
 methods: {
  save: function() {
   const data = {
    id: this.id,
    title: this.editorTitle,
    text: this.editor.value(),
    create_date: this.createDate
   };
   this.updateDbDataTMemo(data);
  }
 },
 created: function() {
  if (
   this.$nuxt.$route.params.id != null &&
   this.$nuxt.$route.params.id !== ''
  ) {
   this.id = this.$nuxt.$route.params.id;
   // 数値の場合
   if (!isNaN(this.id)) {
    this.id = parseInt(this.id, 10);
   }
  }
 },
 mounted: function() {
  this.editor = new SimpleMDE({
   element: document.getElementById('editor')
  });

  const result = this.getDbDataTMemo(this.id);

  let self = this;

  result.then(function(data) {
   self.editorTitle = data.title;
   self.createDate = data.create_date;
   self.editor.value(data.text);
  });
 }
};
</script>

<style></style>
