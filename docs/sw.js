importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js"),workbox&&(workbox.precaching.precacheAndRoute([]),workbox.routing.registerRoute("/",workbox.strategies.networkFirst()),workbox.routing.registerRoute("/weather/",workbox.strategies.networkFirst()),workbox.routing.registerRoute("/umi.css",workbox.strategies.networkFirst()),workbox.routing.registerRoute("/umi.js",workbox.strategies.networkFirst()),workbox.routing.registerRoute(new RegExp("/img/*"),workbox.strategies.networkFirst()),workbox.routing.registerRoute(new RegExp("/#/*"),workbox.strategies.networkFirst()));