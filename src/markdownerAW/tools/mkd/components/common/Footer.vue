<template>
 <footer class="ft-wrap">
  <section class="ft-copy-wrap">
   <div class="inner">
    <div class="ft-copy-box">
     <p class="ft-copy">
      <small class="ft-copy_text" lang="en"
       >&copy; {{ currentYear }} N/NE, All rights reserved.</small
      >
     </p>
    </div>
   </div>
   <!-- /.inner -->
  </section>
  <!-- /.ft-copy-wrap -->
 </footer>
</template>

<script>
export default {
 data: function() {
  return {
   // 現在年
   currentYear: '',
   // スムーススクロール
   smoothScroll: '',
   smoothScrollOption: ''
  };
 },
 // インスタンスが作成された後に実行する処理
 created: function() {
  // 現在年を取得
  const now = new Date();
  const year = now.getFullYear();
  this.currentYear = year;

  if (process.browser) {
   // スムーススクロール
   this.smoothScroll = new SmoothScroll();
   this.smoothScrollOption = {
    header: '#HEADER',
    offset: 20,
    updateURL: false
   };
  }
 },
 // 各処理
 methods: {
  // スムーススクロールを行う処理
  scroll: function(target) {
   // スクロール先が存在する場合
   if (document.querySelectorAll(target).length > 0) {
    const anchor = document.querySelector(target);
    this.smoothScroll.animateScroll(anchor, '', this.smoothScrollOption);
    return false;
   }
  }
 }
};
</script>

<style lang="scss">
// フッター ==========

// SP =====
.ft-wrap {
 margin: 40px auto 0;
 border-top: 1px solid $palette-gray--1;
}
.ft-copy-wrap {
 padding: 24px 0;
}
.ft-copy {
 margin: 0;
 text-align: center;
 line-height: 1;
 color: $palette-gray--3;
}
.ft-copy_text {
 font-size: 1.2rem;
 font-weight: normal;
 font-style: normal;
}

// PC =====
@media screen and (min-width: 768px) {
}
</style>
