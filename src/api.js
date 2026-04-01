import { APP_CONFIG } from './config.js';
import { poiTemplates } from './mock-data.js';

export async function fetchCandidatePois() {
  if (APP_CONFIG.apiMode === 'mock') {
    return poiTemplates;
  }

  throw new Error('真实地图 API 尚未接入：请配置 key 后再启用 real 模式。');
}

export async function fetchAiExplanation() {
  throw new Error('AI explanation API 尚未接入：请配置 key 后再启用。');
}
