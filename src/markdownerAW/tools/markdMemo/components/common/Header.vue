<template>
 <header class="hd-wrap" id="header">
  <div class="hd-main-wrap">
   <div class="inner">
    <div class="hd-box">
     <div class="hd-logo-box">
      <div class="hd-logo">
       <nuxt-link to="/" exact class="hd-logo_link">
        <img src="/img/img_logo.svg" alt="markdMemo" class="hd-logo_img" />
       </nuxt-link>
      </div>
      <!-- /.hd-logo -->
     </div>
     <!-- /.hd-logo-box -->

     <div class="hd-menu-box">
      <div class="hd-menu_btn-box">
       <button
        v-on:click="toggleMenu"
        aria-label="メニューを開閉する"
        title="メニューを開閉する"
        class="hd-menu_btn"
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
        v-bind:class="[isHeaderMenu ? 'on' : 'off']"
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
   this.winY = document.documentElement.scrollTop || document.body.scrollTop;
   this.isHeaderMenu = true;
   let $body = document.body;
   $body.style.top = '-' + this.winY + 'px';
   $body.classList.add('h-op');
  },
  // メニューを閉じる処理
  closeMenu: function(isScroll) {
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
    document
     .querySelector('.page-transition-curtain')
     .classList.add('is-active');
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
.hd-logo_link,
a.hd-logo_link {
 display: block;
 width: 160px;
 margin: 0 0 0 auto;
 padding: 6px 0 0;
}
.hd-logo_img {
 width: 100%;
}

.hd-menu_btn-box {
 position: fixed;
 top: 0;
 left: 0;
 z-index: 6000;
}

.hd-menu_btn {
 display: flex;
 align-items: center;
 padding: 18px 12px 18px 0;
 margin: 0;
 background-color: transparent;
 z-index: 6050;
 border: none;
 outline: none;
 &:after {
  content: '';
  background-color: #0f8775;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 6010;
  width: 8px;
  height: 100%;
 }
}
.hd-menu_hamburger {
 position: relative;
 display: block;
 width: 32px;
 height: 16px;
 i {
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  left: 0;
  background-color: #0f8775;
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
 margin-left: 8px;
 line-height: 1;
}

.head-logo .logo-box {
 padding: 0 8px;
 display: flex;
 align-items: center;
 text-align: left;
 height: 56px;
 box-sizing: border-box;
 h1 {
  margin: 0 8px 0 0;
  a {
   display: block;
  }
  img {
   margin: 0;
   width: 100%;
   min-width: 120px;
   max-width: 140px;
  }
 }
}

.head-menu {
 position: relative;
 .head-menu-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  button {
   width: 100%;
   height: 100%;
   display: block;
   padding: 20px 16px;
   margin: 0;
   background-color: transparent;
   z-index: 101;
   border: none;
   outline: none;
   span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    i {
     position: absolute;
     display: block;
     width: 100%;
     height: 2px;
     left: 0;
     background-color: #002984;
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
  }
 }
 .groval-nav {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100%;
  background-color: #002984;
  z-index: 1000;
  &.on {
   display: block;
  }
  nav {
   width: 100%;
   height: 100%;
   overflow: auto;
   ul {
    margin: 0;
    padding: 0 0 104px;
    list-style: none;
    li {
     margin: 0;
     padding: 0;
     a {
      display: block;
      margin: 0;
      padding: 16px 40px;
      text-align: left;
      color: #fff;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      &:hover {
       color: #fff;
      }
     }
    }
   }
  }
  .head-close-btn {
   width: 100%;
   height: 56px;
   button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 20px 16px;
    margin: 0;
    background-color: transparent;
    z-index: 101;
    border: none;
    outline: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    span {
     position: relative;
     display: block;
     width: 24px;
     height: 16px;
     i {
      position: absolute;
      display: block;
      width: 100%;
      height: 2px;
      left: 0;
      background-color: #fff;
      &:nth-child(1) {
       top: 0;
       -webkit-transform: translateY(7px) rotate(-45deg);
       transform: translateY(7px) rotate(-45deg);
      }
      &:nth-child(2) {
       bottom: 0;
       -webkit-transform: translateY(-7px) rotate(45deg);
       transform: translateY(-7px) rotate(45deg);
      }
     }
    }
   }
  }
 }
 .header-menu-bg-box {
  .groval-nav-bg {
   display: none;
   position: fixed;
   top: 0;
   right: 0;
   width: 280px;
   height: 100%;
   &.on {
    display: block;
   }
   &:nth-of-type(1) {
    z-index: 998;
    background-color: #004aef;
    width: 288px;
   }
   &:nth-of-type(2) {
    z-index: 999;
    background-color: #003cc1;
    width: 284px;
   }
  }
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
 z-index: 700;
}

/* ヘッダーアニメーション */
.header-menu-enter-active {
 transition: all 0.3s;
 transition-delay: 0.1s;
}
.header-menu-leave-active {
 transition: all 0.3s;
}
.header-menu-enter,
.header-menu-leave-to {
 right: -280px !important;
}
.header-menu-enter-to,
.header-menu-leave {
 right: 0 !important;
}

.header-menu-bg1-enter-active {
 transition: all 0.3s;
}
.header-menu-bg1-leave-active {
 transition: all 0.3s;
 transition-delay: 0.1s;
}
.header-menu-bg1-enter,
.header-menu-bg1-leave-to {
 right: -280px !important;
}
.header-menu-bg1-enter-to,
.header-menu-bg1-leave {
 right: 0 !important;
}

.header-menu-bg2-enter-active,
.header-menu-bg2-leave-active {
 transition: all 0.3s;
 transition-delay: 0.05s;
}
.header-menu-bg2-enter,
.header-menu-bg2-leave-to {
 right: -280px !important;
}
.header-menu-bg2-enter-to,
.header-menu-bg2-leave {
 right: 0 !important;
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
 .header-wrap {
  height: 64px;
  .head-box {
   align-items: center;
  }
 }

 .head-logo .logo-box {
  height: 64px;
  h1 {
   margin: 0;
   img {
    width: 160px;
    max-height: 46px;
    min-width: auto;
    max-width: none;
   }
  }
 }

 .head-menu {
  position: relative;
  .head-menu-btn {
   display: none;
  }
  .groval-nav {
   display: block;
   position: relative;
   top: auto;
   right: auto;
   width: auto;
   height: auto;
   background-color: transparent;
   nav {
    width: 100%;
    height: 100%;
    overflow: auto;
    ul {
     padding: 0;
     display: flex;
     align-items: center;
     li {
      a {
       display: block;
       margin: 0;
       padding: 0 12px;
       color: #2e2e2e;
       border-bottom: none;
       text-align: center;
       &:hover {
        color: #4466b1;
       }
      }
     }
    }
   }
   .head-close-btn {
    display: none;
   }
  }
  .header-menu-bg-box {
   display: none;
  }
 }
}
</style>
