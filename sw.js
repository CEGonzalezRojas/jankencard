const cacheName = "jankenup-card-v18";
const assets = [
    "/",
    "/index.html",
    "/assets/fonts/nikumaru.otf",
    "/assets/css/main.css",
    "/assets/js/localization.js",
    "/assets/js/lazyLoad.js",
    "/assets/js/html2canvas.js",
    "/assets/js/three.min.js",
    "/assets/js/vanta.waves.min.js",
    "/assets/js/popperjs_core.min.js",
    "/assets/js/tippy.min.js",
    "/assets/js/main.js",
    "/assets/images/others/arrow-prev.png",
    "/assets/images/others/arrow-next.png",
    "/assets/images/others/random.png",
    "/assets/images/others/fx.png",
    "/assets/images/others/share.png",
    "/assets/images/others/ql-support.png",
    "/assets/images/others/plus.png",
    "/assets/images/others/stats/rock.png",
    "/assets/images/others/stats/paper.png",
    "/assets/images/others/stats/scissors.png",
    "/assets/images/others/texture.png",
    "/assets/images/characters/airini.png",
    "/assets/images/characters/arataka.png",
    "/assets/images/characters/aru.png",
    "/assets/images/characters/barry.png",
    "/assets/images/characters/duo.png",
    "/assets/images/characters/haramiyo.png",
    "/assets/images/characters/jade.png",
    "/assets/images/characters/joaquin.png",
    "/assets/images/characters/juanita.png",
    "/assets/images/characters/matriara.png",
    "/assets/images/characters/matsuo.png",
    "/assets/images/characters/miaufin.png",
    "/assets/images/characters/misae.png",
    "/assets/images/characters/oriax.png",
    "/assets/images/characters/rafaelbudu.png",
    "/assets/images/characters/remi.png",
    "/assets/images/characters/ryusei.png",
    "/assets/images/characters/sakura.png",
    "/assets/images/characters/salfate.png",
    "/assets/images/characters/tesuda.png",
    "/assets/images/characters/zoilah.png",
    "/assets/images/others/mask/card-mask-blue.png",
    "/assets/images/others/mask/card-mask-blue-b.png",
    "/assets/images/others/mask/card-mask-blue-c.png",
    "/assets/images/others/mask/card-mask-blue-d.png",
    "/assets/images/others/mask/card-mask-blue-e.png",
    "/assets/images/others/mask/card-mask-green.png",
    "/assets/images/others/mask/card-mask-green-b.png",
    "/assets/images/others/mask/card-mask-green-c.png",
    "/assets/images/others/mask/card-mask-pink.png",
    "/assets/images/others/mask/card-mask-pink-b.png",
    "/assets/images/others/mask/card-mask-pink-c.png",
    "/assets/images/others/mask/card-mask-purple.png",
    "/assets/images/others/mask/card-mask-purple-b.png",
    "/assets/images/others/mask/card-mask-purple-c.png",
    "/assets/images/others/mask/card-mask-red.png",
    "/assets/images/others/mask/card-mask-red-b.png",
    "/assets/images/others/mask/card-mask-red-c.png",
    "/assets/images/others/mask/card-mask-sky.png",
    "/assets/images/others/mask/card-mask-sky-b.png",
    "/assets/images/others/mask/card-mask-yellow.png",
    "/assets/images/others/mask/card-mask-yellow-b.png"

]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener('activate', (event) => {
    event.waitUntil((async (currentCacheName) => {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(async (cacheName) => {
            if (currentCacheName !== cacheName) await caches.delete(cacheName);
        }));
    })(cacheName));
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    )
});