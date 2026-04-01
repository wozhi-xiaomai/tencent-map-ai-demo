import { APP_CONFIG } from './config.js';

export function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function estimateTravelTime(member, poi, memberIndex = 0) {
  const dist = distance(member, poi);
  const base = Math.round(dist * 0.72 + (member.transport.includes('打车') ? -3 : 4) + memberIndex);
  return Math.max(12, base);
}

export function calcSceneScore(poi, preferences, poiIndex) {
  const { vibe, metro, budget } = preferences;
  let scene = poi.base;

  if (vibe === 'food' && /餐饮|商圈/.test(poi.tags.join(' '))) scene += 4;
  if (vibe === 'coffee' && poiIndex === 1) scene += 2;
  if (vibe === 'shopping' && poiIndex !== 1) scene += 4;
  if (vibe === 'quiet' && poiIndex === 2) scene += 3;
  if (metro === 'yes' && poi.tags.includes('地铁方便')) scene += 4;
  if (budget === 'low' && poiIndex === 1) scene += 3;
  if (budget === 'high' && poiIndex === 2) scene += 3;

  return scene;
}

export function normalizeWeights(rawWeights = {}) {
  const fallback = APP_CONFIG.scoreWeights;
  const fairness = Math.max(0.05, Number(rawWeights.fairness ?? fallback.fairness));
  const accessibility = Math.max(0.05, Number(rawWeights.accessibility ?? fallback.accessibility));
  const scene = Math.max(0.05, Number(rawWeights.scene ?? fallback.scene));
  const total = fairness + accessibility + scene;

  return {
    fairness: fairness / total,
    accessibility: accessibility / total,
    scene: scene / total,
  };
}

export function buildResults({ members, pois, preferences, weights }) {
  const normalizedWeights = normalizeWeights(weights);

  return pois.map((poi, idx) => {
    const times = members.map((member, memberIndex) => estimateTravelTime(member, poi, memberIndex));
    const fairness = Math.max(0, 100 - (Math.max(...times) - Math.min(...times)) * 2.1);
    const avg = times.reduce((sum, value) => sum + value, 0) / times.length;
    const access = Math.max(0, 100 - avg * 1.2);
    const scene = calcSceneScore(poi, preferences, idx);
    const total = Math.round(
      fairness * normalizedWeights.fairness +
      access * normalizedWeights.accessibility +
      scene * normalizedWeights.scene,
    );

    return {
      poi,
      times,
      fairness: Math.round(fairness),
      access: Math.round(access),
      scene: Math.round(scene),
      total,
      averageTime: Math.round(avg),
      gap: Math.max(...times) - Math.min(...times),
      normalizedWeights,
    };
  }).sort((a, b) => b.total - a.total);
}
