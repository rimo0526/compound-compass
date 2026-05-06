// 複利コンパス Service Worker v3
// 戦略：HTMLは常にネットワーク優先（古いキャッシュ問題を完全回避）
//        静的アセット（icon, manifest等）のみキャッシュ
const CACHE_NAME = 'compound-compass-v3';

// キャッシュする対象は静的アセットのみ（HTMLは絶対にキャッシュしない）
const STATIC_ASSETS = [
  './icon.svg',
  './icon-maskable.svg',
  './og-image.svg',
  './manifest.json'
];

// インストール時：静的アセットだけプリキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(STATIC_ASSETS).catch(err => console.warn('SW prefetch:', err))
    )
  );
  self.skipWaiting();
});

// アクティベート時：古い全キャッシュを削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// フェッチ時の戦略：
//   - HTML/Navigate：ネットワーク優先（フォールバック：オフライン文言）
//   - 静的アセット：キャッシュ優先、なければネットワーク
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const accept = event.request.headers.get('accept') || '';
  const isHTML = event.request.mode === 'navigate' || accept.includes('text/html');

  if (isHTML) {
    // HTMLは常にネットワーク優先
    event.respondWith(
      fetch(event.request).catch(() => new Response(
        '<html><body style="font-family:sans-serif;text-align:center;padding:48px;background:#F7F3EC;color:#1E2A38;"><h1>オフライン</h1><p>ネットワーク接続を確認してください。</p><a href="./" style="color:#C56A4E;">再読み込み</a></body></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      ))
    );
    return;
  }

  // 静的アセットはキャッシュ優先
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone)).catch(() => {});
        }
        return response;
      }).catch(() => cached);
    })
  );
});

// メッセージで強制更新可能（緊急時用）
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
