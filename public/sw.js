/* eslint-disable no-restricted-globals */

/**
 * ServiceWorker v 0.1.1
 */

const CACHE_NAME = 'cache-v1';

const policies = {
  precacheUrls: [
    '/',
    '/favicon.ico',
    '/pwalogo.svg',
    '/manifest.json',
    '/images/1.jpg',
    'https://restcountries.eu/rest/v2/all'
  ],
  cacheFirst: [
    /\.(svg|png|jpg|jpeg|gif|webp|ico)$/, // images
    /\.(css|js)$/, // css, js
    /^https:\/\/restcountries\.eu/,
    /^http:\/\/api\.weatherstack\.com/
  ]
};

const matchSomePattern = patterns => url => patterns.some(pattern => pattern.test(url));
const isCacheFirstUrl = url => matchSomePattern(policies.cacheFirst)(url);
const isCanCacheUrl = url => true;

const precache = async () => {
  /**
   * 1. precache resources to be able work offline
   * 2. skip waiting SW activation
   */
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(policies.precacheUrls);
  await self.skipWaiting();
};

const deleteOldCaches = async () => {
  const cacheKeys = await caches.keys();
  const cacheKeysToDelete = cacheKeys.filter(key => key !== CACHE_NAME);
  const deletePromises = cacheKeysToDelete.map(key => caches.delete(key));
  await Promise.all(deletePromises);
};

const sendMessageToClients = async message => {
  const allClients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
  allClients.forEach(client => {
    client.focus();
    client.postMessage(`Message for ${client.url}: ${message}`);
  });
};

const putResponseToCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
};

const getResponseFromCache = async event => {
  // Respond from the cache if we can
  const cachedResponse = await caches.match(event.request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Else, use the preloaded response, if it's there
  const preloadResponse = await event.preloadResponse;
  if (preloadResponse) {
    return preloadResponse;
  }

  return null;
};

const getResponseFromNetwork = async request => {
  const networkResponse = await fetch(request);

  if (isCanCacheUrl(request.url)) {
    // put response to cache if needed
    await putResponseToCache(request, networkResponse.clone());
  }

  return networkResponse;
};

/**
 * Cache then network
 */
const cacheFirstResponse = async event => {
  const cachedResponse = await getResponseFromCache(event);
  if (cachedResponse) {
    return cachedResponse;
  }

  return getResponseFromNetwork(event.request);
};

/**
 * Network then cache
 */
const networkFirstResponse = async event => {
  try {
    const networkResponse = await getResponseFromNetwork(event.request);
    return networkResponse;
  } catch (err) {
    // are we offline?
    console.log(err);
    return getResponseFromCache(event);
  }
};

/**
 * Only network
 */
// const networkOnlyResponse = (event) => getResponseFromNetwork(event.request);

/**
 * EVENTS
 */

self.addEventListener('install', event => {
  console.log('Service Worker, install');
  event.waitUntil(precache());
});

self.addEventListener('activate', event => {
  console.log('Service Worker, activate');
  /**
   * 1. set itself (SW) as the controller for all clients
   * 2. delete old caches
   */
  event.waitUntil(Promise.all([self.clients.claim(), deleteOldCaches()]));
});

self.addEventListener('fetch', async event => {
  event.respondWith(
    (async () => {
      const { url } = event.request;

      /**
       * Determine response strategy
       */
      if (isCacheFirstUrl(url)) {
        return cacheFirstResponse(event);
      } else {
        return networkFirstResponse(event);
      }
    })()
  );
});

self.addEventListener('message', event => {
  console.log(`The client sent me a message: ${event.data}`);
  event.waitUntil(sendMessageToClients(event.data));
});

self.addEventListener('push', async event => {
  const text = await event.data.text();
  console.log(text);
});

self.addEventListener('sync', event => {
  // todo
});

self.addEventListener('notificationclick', event => {
  // todo
});
