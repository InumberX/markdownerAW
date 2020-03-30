<template>
 <div class="cnt-box is-page-ttl">
  <div class="inner">
   <div class="page-ttl">
    <h1 class="page-ttl_tx">{{ title }}</h1>
   </div>
  </div>
  <!-- /.inner -->
 </div>
 <!-- /.cnt-box -->
</template>

<script>
export default {
 props: ['title']
};
</script>

<style lang="scss">
/* ページタイトル ========== */

/* SP ===== */
.cnt-box {
 position: relative;
 &.is-page-ttl {
  padding-top: 60px;
  background-color: $palette-white--1;
  overflow: hidden;
  + .cnt-box {
   margin-top: 24px;
  }
 }
}

.page-ttl {
 position: relative;
 padding: 24px 0 40px;
 &:after {
  content: '';
  position: absolute;
  bottom: 50%;
  right: 50%;
  margin-bottom: -300px;
  margin-right: 0;
  width: 1000px;
  height: 1000px;
  background-color: $palette-green--1;
  z-index: $z-index--2;
  transform: rotate(32deg);
 }
}

.page-ttl_tx {
 display: inline-block;
 margin: 0;
 padding: 2px 4px;
 font-size: 2.2rem;
 font-weight: bold;
 position: relative;
 z-index: $z-index--3;
 background-color: $palette-white--1;
 color: $palette-black--2;
}

/* PC ===== */
@media screen and (min-width: 768px) {
}
</style>
