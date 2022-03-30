// 引入 workbox 核心
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js')
// 预缓存
workbox.precaching.precacheAndRoute([]);

// 缓存策略
workbox.routing.registerRoute(
  '/',
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  '/umi.css',
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  '/umi.js',
  workbox.strategies.networkFirst()
);
workbox.routing.registerRoute(
  new RegExp('/img/*'),
  workbox.strategies.networkFirst()
);
