const siteDomain = 'https://afterworks.jp';
const siteRootDir = '/tools/mkd';
const siteName = 'mkDowner';

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

module.exports = {
 exportTrailingSlash: true,
 env: {
  siteDomain: siteDomain,
  siteRootDir: siteRootDir,
  siteName: siteName,
  cashBuster: cashBuster,
 },
 assetPrefix: siteRootDir,
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
};
