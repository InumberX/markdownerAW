const now = new Date();
let year = now.getFullYear();
let month = now.getMonth() + 1;
month = ('0' + month).slice(-2);
let day = now.getDate();
day = ('0' + day).slice(-2);
let hour = now.getHours();
hour = ('0' + hour).slice(-2);
let minute = now.getMinutes();
minute = ('0' + minute).slice(-2);
let second = now.getSeconds();
second = ('0' + second).slice(-2);
const cashBuster = '?ver=' + year + month + day + hour + minute + second;

const srcDir = 'tools/mkd/';
const baseDir = '/' + srcDir;

export default {
 mode: 'universal',
 env: {
  cashBuster: cashBuster
 },
 srcDir: srcDir,
 router: {
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  base: baseDir,
  // ページ遷移時の設定
  scrollBehavior: function(to, from, savedPosition) {
   // トップまでスクロールする
   return { x: 0, y: 0 };
  }
 },
 /*
  ** Headers of the page
  */
 head: {
  titleTemplate: '%s | mkDowner',
  htmlAttrs: {
   lang: 'ja',
   prefix: 'og: http://ogp.me/ns#'
  },
  base: {
   href: 'router.base'
  },
  meta: [
   {
    charset: 'utf-8'
   },
   {
    name: 'viewport',
    content: 'width=device-width, initial-scale=1'
   },
   {
    hid: 'xUaCompatible',
    'http-equiv': 'X-UA-Compatible',
    content: 'IE=edge'
   },
   {
    hid: 'telephone',
    name: 'format-detection',
    content: 'telephone=no'
   },
   {
    hid: 'description',
    name: 'description',
    content:
     'マークダウンエディタ「mkDowner（マークダウナー）」です。マークダウン形式でのテキストの作成・保存ができます。'
   },
   {
    hid: 'ogTitle',
    property: 'og:title',
    content: 'mkDowner'
   },
   {
    hid: 'ogType',
    property: 'og:type',
    content: 'website'
   },
   {
    hid: 'ogUrl',
    property: 'og:url',
    content: 'https://afterworks.jp/' + srcDir
   },
   {
    hid: 'ogImage',
    property: 'og:image',
    content: 'https://afterworks.jp/' + srcDir + 'img/img_og_1.png'
   },
   {
    hid: 'ogSiteName',
    property: 'og:site_name',
    content: 'mkDowner'
   },
   {
    hid: 'ogDescription',
    property: 'og:description',
    content:
     'マークダウンエディタ「mkDowner（マークダウナー）」です。マークダウン形式でのテキストの作成・保存ができます。'
   },
   {
    hid: 'twitterCard',
    name: 'twitter:card',
    content: 'summary_large_image'
   },
   {
    hid: 'twitterSite',
    name: 'twitter:site',
    content: '@InumberX'
   },
   {
    hid: 'twitterDescription',
    name: 'twitter:description',
    content:
     'マークダウンエディタ「mkDowner（マークダウナー）」です。マークダウン形式でのテキストの作成・保存ができます。'
   }
  ],
  link: [
   {
    hid: 'faviconIco',
    rel: 'shortcut icon',
    type: 'image/x-icon',
    href: '/img/favicon.ico'
   },
   {
    hid: 'faviconPng',
    rel: 'icon',
    type: 'image/png',
    href: '/img/favicon.png'
   },
   {
    hid: 'appleTouchIcon',
    rel: 'apple-touch-icon',
    href: '/img/favicon.png'
   },
   {
    hid: 'canonical',
    rel: 'canonical',
    href: 'https://afterworks.jp/' + srcDir
   }
  ],
  script: [
   {
    src: baseDir + 'js/scroll-magic.min.js' + cashBuster,
    type: 'text/javascript',
    body: false,
    defer: true
   },
   {
    src: baseDir + 'js/smooth-scroll.polyfills.min.js' + cashBuster,
    type: 'text/javascript',
    body: false,
    defer: true
   },
   {
    src: baseDir + 'js/marked.min.js' + cashBuster,
    type: 'text/javascript',
    body: false,
    defer: true
   },
   {
    src: baseDir + 'js/simplemde.min.js' + cashBuster,
    type: 'text/javascript',
    body: false,
    defer: true
   }
  ]
 },
 /*
  ** Customize the progress-bar color
  */
 loading: {
  color: '#0f8775',
  height: '4px'
 },
 /*
  ** Global CSS
  */
 css: [
  {
   src: '@/assets/css/common.scss',
   lang: 'scss'
  },
  {
   src: '@/assets/css/common_pc.scss',
   lang: 'scss'
  }
 ],
 /*
  ** Plugins to load before mounting the App
  */
 plugins: ['@/plugins/mixin'],
 /*
  ** Nuxt.js dev-modules
  */
 buildModules: [],
 /*
  ** Nuxt.js modules
  */
 modules: [
  // Doc: https://axios.nuxtjs.org/usage
  '@nuxtjs/axios',
  '@nuxtjs/pwa',
  '@nuxtjs/style-resources'
 ],
 styleResources: {
  scss: ['@/assets/css/_common/_variable.scss']
 },
 /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {},
 /*
  ** Build configuration
  */
 build: {
  filenames: {
   app: () => 'js/[name].js' + cashBuster,
   chunk: () => 'js/[name].js' + cashBuster,
   css: () => 'css/[name].css' + cashBuster,
   img: () => 'img/[name].[ext]' + cashBuster,
   font: () => 'font/[name].[ext]' + cashBuster,
   video: () => 'video/[name].[ext]' + cashBuster
  },
  extractCSS: true,
  /*
   ** You can extend webpack config here
   */
  extend(config, ctx) {}
 },
 /*
  ** generate
  */
 generate: {
  fallback: true
 },
 /*
  ** hooks
  */
 hooks: {}
};
