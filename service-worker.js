/* The service worker is the first code that runs in the application, even before index.html or any other JavaScript file. As long as the browser supports service workers, the service worker will run, regardless of whether or not the user is connected to the internet. This means that if you were to update your application code, the service worker will still load the old files. */

const APP_PREFIX = 'FoodFest-';     
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
    "./index.html",
    "./events.html",
    "./tickets.html",
    "./schedule.html",
    "./assets/css/style.css",
    "./assets/css/bootstrap.css",
    "./assets/css/tickets.css",
    "./dist/app.bundle.js",
    "./dist/events.bundle.js",
    "./dist/tickets.bundle.js",
    "./dist/schedule.bundle.js"
  ];

self.addEventListener('install', function (e) {
    // tell the browser to wait until the work is complete before terminating the service worker. This ensures that the service worker doesn't move on from the installing phase until it's finished executing all of its code.
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) { // We use caches.open to find the specific cache by name, then add every file in the FILES_TO_CACHE array to the cache.
          console.log('installing cache : ' + CACHE_NAME)
          return cache.addAll(FILES_TO_CACHE)
        })
      )
})

// Why don't we use window.addEventListener instead of self? Well, service workers run before the window object has even been created. So instead we use the self keyword to instantiate listeners on the service worker. The context of self here refers to the service worker object.

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) { // .keys() returns an array of all cache names, which we're calling keyList. keyList is a parameter that contains all cache names under <username>.github.io
      let cacheKeeplist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX); // we may host many sites from the same URL, so we should filter out caches that have the app prefix. We'll capture the ones that have that prefix, stored in APP_PREFIX, and save them to an array called cacheKeeplist using the .filter() method
      });
      cacheKeeplist.push(CACHE_NAME); // Remember that we set up CACHE_NAME as a global constant to help keep track of which cache to use

      return Promise.all(
        keyList.map(function (key, i) { // a Promise that resolves once all old versions of the cache have been deleted.
          if (cacheKeeplist.indexOf(key) === -1) {
            console.log('deleting cache : ' + keyList[i] );
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});

// listen for the fetch event, log the URL of the requested resource, and then begin to define how we will respond to the request.
self.addEventListener('fetch', function (e) {
  console.log('fetch request : ' + e.request.url)
  e.respondWith( // check to see if the request is stored in the cache or not. If it is stored in the cache, e.respondWith will deliver the resource directly from the cache; otherwise the resource will be retrieved normally
    caches.match(e.request).then(function (request) {
      if (request) { // determine if the resource already exists in caches
        console.log('responding with cache : ' + e.request.url) // every single time the application requests a resource, we'll console log the path (e.request.url) to that resource
        return request
      } else { // if the resource is not in caches, we allow the resource to be retrieved from the online network as usual
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
    }
    
    // You can omit if/else for console.log & put one line below like this too.
    // return request || fetch(e.request)
    })
  )
})