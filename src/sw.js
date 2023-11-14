let cacheName = "snake";
var filesToCache = [
  "",
  "index.html",
  "snake.css",
  "snake.js",
  "lib/phaser.min.js",
];

self.addEventListener("install", (event) => {
  console.log("sw install");

  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("sw caching files");
        return cache.addAll(filesToCache);
      })
      .catch((err) => {
        console.log(err);
      }),
  );
});

self.addEventListener("fetch", (event) => {
  console.log("sw fetch");
  console.log(event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
      .catch((error) => {
        console.log(error);
      }),
  );
});
