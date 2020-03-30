<template>
 <header class="hd-wrap" id="header">
  <div class="hd-main-wrap">
   <div class="inner">
    <div class="hd-box">
     <div class="hd-logo-box">
      <div class="hd-logo">
       <nuxt-link to="/" exact class="hd-logo_link">
        <img
         src="img/img_logo.svg"
         alt="markdMemo"
         class="hd-logo_img"
         width="120px"
         height="30px"
        />
       </nuxt-link>
      </div>
      <!-- /.hd-logo -->
     </div>
     <!-- /.hd-logo-box -->

     <div class="hd-menu-box">
      <div class="hd-menu_btn-box">
       <button
        v-on:click="toggleMenu"
        class="hd-menu_btn"
        v-bind:class="[{ 'is-active': isHeaderMenu }]"
       >
        <span class="hd-menu_hamburger">
         <i></i>
         <i></i>
         <i></i>
        </span>
        <span class="hd-menu_btn-tx" v-cloak>{{ menuBtnTx }}</span>
       </button>
      </div>
      <transition name="hd-menu">
       <div
        class="gl-nav-box"
        v-if="!isSp() || isHeaderMenu"
        v-bind:class="[{ 'is-active': isHeaderMenu }]"
        v-cloak
       >
        <nav class="gl-nav">
         <ul class="gl-nav_items">
          <li class="gl-nav_item">
           <nuxt-link
            to="/"
            exact
            v-on:click.native="closeMenu(false)"
            class="gl-nav_link"
            >一覧</nuxt-link
           >
          </li>
          <li class="gl-nav_item">
           <nuxt-link
            to="/create/"
            v-on:click.native="closeMenu(false)"
            class="gl-nav_link"
            >新規作成</nuxt-link
           >
          </li>
         </ul>
        </nav>
       </div>
       <!-- /.gl-nav -->
      </transition>
     </div>
     <!-- /.hd-menu-box -->
    </div>
    <!-- /.hd-box -->
   </div>
   <!-- /.inner -->
  </div>
  <!-- /.hd-main-wrap -->
 </header>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
 data: function() {
  return {
   // ブレイクポイント
   bp: 767,
   // メニュー表示フラグ
   isHeaderMenu: false,
   // メニューボタンの文字
   menuBtnTx: 'MENU'
  };
 },
 // インスタンスが作成された後に実行する処理
 created: function() {
  if (process.browser) {
   // リサイズ時にウィンドウサイズを更新する処理を設定
   window.addEventListener('resize', this.checkSp, false);
  }
 },
 // インスタンスがマウントされた後に実行する処理
 mounted: function() {
  this.checkSp();
 },
 // 各処理
 methods: {
  // ウィンドウサイズを更新する処理
  checkSp: function() {
   if (window.innerWidth > this.bp) {
    if (this.isSp()) {
     this.$store.commit('is_sp/setIsPc');
    }
   } else {
    if (!this.isSp()) {
     this.$store.commit('is_sp/setIsSp');
    }
   }
  },
  // SPメニューボタン押下時の処理
  toggleMenu: function() {
   // メニューが閉じていた場合
   if (!this.isHeaderMenu) {
    this.openMenu();
   } else {
    // メニューが開いていた場合
    this.closeMenu(true);
   }
  },
  // メニューを開く処理
  openMenu: function() {
   this.menuBtnTx = 'CLOSE';
   this.winY = document.documentElement.scrollTop || document.body.scrollTop;
   this.isHeaderMenu = true;
   let $body = document.body;
   $body.style.top = '-' + this.winY + 'px';
   $body.classList.add('h-op');
  },
  // メニューを閉じる処理
  closeMenu: function(isScroll) {
   this.menuBtnTx = 'MENU';
   this.isHeaderMenu = false;
   let $body = document.body;
   $body.classList.remove('h-op');
   $body.style.top = '';
   // メニュー表示前の位置までスクロールさせる場合
   if (isScroll) {
    scrollTo(0, this.winY);
   }
   // スクロールさせない（画面遷移する）場合
   else {
   }
  },
  isSp: function() {
   return this.$store.state.is_sp.isSp;
  }
 },
 // 監視プロパティ
 watch: {
  storeIsSp: function() {}
 },
 computed: {
  storeIsSp() {
   return this.$store.state.is_sp.isSp;
  }
 }
};
</script>

<style lang="scss">
// ヘッダー ==========

// SP =====
.hd-wrap {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 z-index: $z-index__hd--1;
}

.hd-logo-box {
 height: 60px;
 display: flex;
 align-items: center;
}
.hd-logo {
 margin: 0 0 0 auto;
}
.hd-logo_link,
a.hd-logo_link {
 display: block;
 width: 120px;
 margin: 0 0 0 auto;
 padding: 0;
}
.hd-logo_img {
 width: 100%;
}

.hd-menu_btn-box {
 position: fixed;
 top: 0;
 left: 0;
 z-index: $z-index__hd--2;
}

.hd-menu_btn {
 padding: 12px;
 margin: 0;
 background-color: $palette-green--1;
 z-index: $z-index__hd--4;
 border: none;
 outline: none;
 transition: 0.3s color;
 &:after {
  content: '';
  background-color: $palette-green--1;
  position: fixed;
  left: 0;
  top: 0;
  z-index: $z-index__hd--3;
  width: 8px;
  height: 100%;
 }
 &.is-active {
  color: $palette-white--1;
  &:before {
   content: '';
   position: fixed;
   left: 0;
   top: 0;
   z-index: $z-index__hd--3;
   width: 280px;
   height: 60px;
  }
  &:after {
   content: none;
  }
  .hd-menu_hamburger {
   i {
    background-color: $palette-white--1;
    width: 24px;
    left: 4px;
    &:nth-child(1) {
     top: 7px;
     transform: rotate(45deg);
    }
    &:nth-child(2) {
     opacity: 0;
    }
    &:nth-child(3) {
     bottom: 7px;
     transform: rotate(-45deg);
    }
   }
  }
 }
}
.hd-menu_hamburger {
 position: relative;
 display: block;
 width: 32px;
 height: 16px;
 margin: 0 auto;
 i {
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  left: 0;
  background-color: $palette-white--1;
  transition: 0.3s all;
  &:nth-child(1) {
   top: 0;
  }
  &:nth-child(2) {
   top: 50%;
   margin-top: -1px;
  }
  &:nth-child(3) {
   bottom: 0;
  }
 }
}
.hd-menu_btn-tx {
 white-space: nowrap;
 font-size: 1.2rem;
 margin-top: 8px;
 line-height: 1;
 display: block;
 color: $palette-white--1;
}

.gl-nav-box {
 display: none;
 position: fixed;
 top: 0;
 left: 0;
 width: 280px;
 height: 100%;
 background-color: $palette-green--1;
 box-shadow: 0 4px 12px rgba($palette-black--1, 0.8);
 z-index: $z-index__hd-menu--1;
 margin: 0;
 padding: 60px 0 0;
 &.is-active {
  display: block;
 }
}

.gl-nav_items {
 list-style: none;
 margin: 0;
 padding: 0;
 > .gl-nav_item {
  &:first-child {
   border-top: 1px dotted $palette-green--2;
  }
 }
}
.gl-nav_item {
 margin: 0;
 padding: 0;
 border-bottom: 1px dotted $palette-green--2;
}
.gl-nav_link,
a.gl-nav_link {
 display: block;
 margin: 0;
 padding: 12px 16px;
 color: $palette-white--1;
 text-decoration: none;
 transition: 0.3s color, 0.3s background-color;
 &:hover {
  background-color: $palette-green--1;
  color: $palette-white--1;
 }
}

.h-overlay {
 display: block;
 position: fixed;
 top: 0;
 left: 0;
 right: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.2);
 z-index: $z-index__ovly--1;
}

/* ヘッダーアニメーション */
.hd-menu-enter-active {
 transition: all 0.3s;
 transition-delay: 0.1s;
}
.hd-menu-leave-active {
 transition: all 0.3s;
}
.hd-menu-enter,
.hd-menu-leave-to {
 left: -280px !important;
}
.hd-menu-enter-to,
.hd-menu-leave {
 left: 0 !important;
}

/* オーバレイアニメーション */
.overlay-enter-active,
.overlay-leave-active {
 transition: opacity 0.3s ease;
}
.overlay-enter,
.overlay-leave-active {
 opacity: 0;
}
.overlay-enter-to,
.overlay-leave {
 opacity: 1;
}

/* PC
*************************************************/
@media screen and (min-width: 768px) {
}
</style>
