export const APP_CONFIG = {
  appName: 'AI 多人出行汇合点推荐助手',
  apiMode: 'mock',
  defaultCity: '深圳',
  featureFlags: {
    enableMockApi: true,
    enableRealMapApi: false,
    enableAiExplain: false,
  },
  scoreWeights: {
    fairness: 0.35,
    accessibility: 0.35,
    scene: 0.30,
  },
};

export function getFeatureFlag(name) {
  return Boolean(APP_CONFIG.featureFlags[name]);
}
