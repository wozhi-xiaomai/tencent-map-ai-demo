import { APP_CONFIG } from './config.js';

const TMAP_SCRIPT_ID = 'tencent-map-sdk';

function buildSdkUrl(key) {
  const params = new URLSearchParams({
    key,
    v: '1.exp',
    libraries: 'service',
  });
  return `https://map.qq.com/api/gljs?${params.toString()}`;
}

export function getTencentMapKey() {
  return APP_CONFIG.tencentMap?.key || '';
}

export function hasRealMapKey() {
  return Boolean(getTencentMapKey());
}

export function ensureMapSdk() {
  const key = getTencentMapKey();
  if (!key) {
    throw new Error('未配置腾讯地图 key，当前只能显示演示地图。');
  }

  if (window.TMap) {
    return Promise.resolve(window.TMap);
  }

  const existing = document.getElementById(TMAP_SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve(window.TMap));
      existing.addEventListener('error', () => reject(new Error('腾讯地图 SDK 加载失败')));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = TMAP_SCRIPT_ID;
    script.src = buildSdkUrl(key);
    script.async = true;
    script.onload = () => resolve(window.TMap);
    script.onerror = () => reject(new Error('腾讯地图 SDK 加载失败'));
    document.head.appendChild(script);
  });
}

export async function createTencentMap(container, center = { lat: 22.540503, lng: 113.934528 }) {
  const TMap = await ensureMapSdk();
  const map = new TMap.Map(container, {
    zoom: 11,
    center: new TMap.LatLng(center.lat, center.lng),
  });
  return { TMap, map };
}
