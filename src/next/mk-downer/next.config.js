const siteDomain = 'https://markdw.netlify.app';
const siteRootDir = '';
const siteName = 'mkDowner';
const siteDescription =
 'マークダウンエディタ「mkDowner（マークダウナー）」です。マークダウン形式でのテキストの作成・保存ができます。';

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

const nextConfig = {
 exportTrailingSlash: true,
 env: {
  siteDomain: siteDomain,
  siteRootDir: siteRootDir,
  siteName: siteName,
  cashBuster: cashBuster,
  siteDescription: siteDescription,
 },
 assetPrefix: siteRootDir + '/',
 experimental: {
  basePath: siteRootDir,
 },
 generateBuildId: async () => {
  return 'mk-downer';
 },
 webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  return config;
 },
 exportPathMap: async () => {
  return {
   '/': {
    page: '/',
   },
   '/create/': {
    page: '/create',
   },
   '/edit/': {
    page: '/edit',
   },
   '/show/': {
    page: '/show',
   },
  };
 },
 target: 'serverless',
 transformManifest: (manifest) => ['/'].concat(manifest),
 generateInDevMode: false,
 registerSwPrefix: siteRootDir,
 scope: siteRootDir + '/',
 workboxOpts: {
  runtimeCaching: [
   {
    urlPattern: /^https?.*/,
    handler: 'NetworkFirst',
    options: {
     cacheName: 'https-calls',
     networkTimeoutSeconds: 15,
     expiration: {
      maxEntries: 150,
      maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
     },
     cacheableResponse: {
      statuses: [0, 200],
     },
    },
   },
  ],
 },
};

// withOfflineを読み込む
const withOffline = require('next-offline');

// nextConfigをwithOfflineに渡す
module.exports = withOffline(nextConfig);
