// =============================================
// 가돌 성경 PWA — Service Worker
// Cache-First 전략 (성경 데이터는 오프라인 지원)
// =============================================

const CACHE_NAME = 'gadol-bible-v2.7.0';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/bible.html',
  '/credits.html',
  '/css/main.css',
  '/js/data.js',
  '/js/bible-data.js',
  '/js/dict.js',
  '/js/app.js',
  '/manifest.json',
];

// ── 설치: 핵심 파일 캐시 ─────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] 핵심 파일 캐시 중...');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ── 활성화: 이전 캐시 정리 ───────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── 네트워크 요청 처리 ────────────────────────
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Google Fonts, Wikipedia API, OSM Tile은 네트워크 우선
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('wikipedia.org') ||
    url.hostname.includes('tile.openstreetmap.org')
  ) {
    event.respondWith(
      fetch(event.request)
        .then(resp => {
          // 성공 시 캐시에도 저장 (다음 오프라인 대비)
          const cloned = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          return resp;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 나머지는 Cache-First (성경 본문, CSS, JS)
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(resp => {
        if (resp && resp.status === 200 && event.request.method === 'GET') {
          const cloned = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return resp;
      });
    })
  );
});
