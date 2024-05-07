const isOnline = self.navigator.onLine;
const cacheVer = "v6";
const assetsCacheName = `assets-${cacheVer}`;
const imagesCacheName = `img-${cacheVer}`;
const dynamicCacheName = `dynamic-${cacheVer}`;

const addResourcesToCache = async (type, resources) => {
    const cache = await caches.open(
        type === "assets" ? assetsCacheName : imagesCacheName,
    );
    await cache
        .addAll(resources)
        .then(() => {
            console.log("Resource added!");
        })
        .catch((error) => {
            console.log("Add resource fail", error);
        });
};

const putInCache = async (type, request, response) => {
    const cache = await caches.open(
        type === "assets"
            ? assetsCacheName
            : type === "image"
            ? imagesCacheName
            : dynamicCacheName,
    );
    await cache.put(request, response);
};

self.addEventListener("install", (evt) => {
    console.log("server worker add resource!");

    evt.waitUntil(
        addResourcesToCache("assets", [
            "/vi",
            "/_next/static/css/app/[locale]/page.css",
            "_next/static/chunks/app/layout.js",
            "/_next/static/chunks/webpack.js",
            "/_next/static/chunks/main-app.js",
        ]).then(() => {
            addResourcesToCache("image", [
                "/assets/images/bg.jpg",
                "/assets/images/icon-fb.svg",
                "/assets/images/icon-insta.svg",
                "/assets/images/icon-line.svg",
                "/assets/images/slide-banner.jpg",
                "/favicon.ico",
            ]);
        }),
    );
});

self.addEventListener("activate", (evt) => {
    console.log("Service worker activated");
    evt.waitUntil(deleteOldCaches());
    // evt.waitUntil(self.registration?.navigationPreload.enable());
});

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
    // First try to get the resource from the cache

    const responseFromCache = await caches.match(request);

    if (responseFromCache) {
        return responseFromCache;
    }

    // const preloadResponse = await preloadResponsePromise();
    // if (preloadResponse) {
    //     console.info("using preload response", preloadResponse);
    //     putInCache(request, preloadResponse.clone());
    //     return preloadResponse;
    // }
    // Next try to get the resource from the network
    try {
        console.log({ request });
        let options = {
            mode: request.mode, // cors, no-cors, same-origin, navigate
            cache: "no-cache",
        };
        console.log({ mode: request.mode, url: request.url });
        if (!request.url.startWith(location.origin)) {
            (options.mode = "cors"), (options.credentials = "omit");
        }

        const responseFromNetwork = await fetch(request, {
            ...options,
        });

        const contentType = responseFromNetwork.headers.get("content-type");

        if (contentType.match(/image/i) || contentType.match(/font/i)) {
            putInCache("image", request, responseFromNetwork.clone());
        } else {
            putInCache("assets", request, responseFromNetwork.clone());
        }

        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one

        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if (fallbackResponse) {
            return fallbackResponse;
        }
        // when even the fallback response is not available,
        // there is nothing we can do, but we must always
        // return a Response object
        return new Response("Network error happened", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
        });
    }
};

self.addEventListener("fetch", (event) => {
    event.respondWith(
        cacheFirst({
            request: event.request,
            // preloadResponsePromise: event.preloadResponse,
            fallbackUrl: "/assets/images/logo-anthai.svg",
        }),
    );
});

/**
 * Delete old cache
 */

const deleteOldCaches = async () => {
    const keyList = await caches.keys();

    const cachesToDelete = keyList.filter(
        (key) =>
            key !== assetsCacheName &&
            key !== imagesCacheName &&
            key !== dynamicCacheName,
    );
    await Promise.all(cachesToDelete.map((key) => caches.delete(key)));
};
