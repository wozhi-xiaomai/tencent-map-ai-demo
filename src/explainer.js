export function buildExplanation(best, goal, runnerUp) {
  const compareText = runnerUp
    ? `与第二名 ${runnerUp.poi.name} 相比，当前第一名在综合得分上更稳，尤其体现在多人通勤均衡和整体场景完成度上。`
    : '当前只有一个可比较方案，因此直接输出首选结果。';

  return {
    summary: `系统推荐 ${best.poi.name} 作为本次汇合点。它在“多人通勤公平性、商圈成熟度、餐饮匹配度、交通可达性”四个维度上综合得分最高。`,
    bullets: [
      `从用户诉求来看：${goal}，最适合选择一个既不偏单边、又能快速落地吃饭/聊天的区域。`,
      `从通勤公平性看，当前推荐点的成员通勤时间差约为 ${best.gap} 分钟，整体更均衡。`,
      `从场景完整度看，推荐点周边具备餐饮、休闲、地铁换乘等配套，适合聚会后继续安排二次活动。`,
      '从产品实现角度看，适合继续接入真实 POI 检索、路线规划、拥堵估计与大模型解释输出。',
    ],
    compareText,
  };
}

export function buildPlanSummary(best, members, weights) {
  const weightPercent = {
    fairness: Math.round(weights.fairness * 100),
    accessibility: Math.round(weights.accessibility * 100),
    scene: Math.round(weights.scene * 100),
  };

  return {
    summary: `${members.length} 位成员参与决策，当前系统更偏向“公平性 ${weightPercent.fairness}% / 可达性 ${weightPercent.accessibility}% / 场景匹配 ${weightPercent.scene}%”的综合平衡。`,
    bullets: [
      `首选地点：${best.poi.name}`,
      `平均到达时长：${best.averageTime} 分钟`,
      `成员间时间差：${best.gap} 分钟`,
      `推荐标签：${best.poi.tags.join('、')}`,
    ],
  };
}

export function buildWhyNotRecommendation(best, runnerUp) {
  if (!runnerUp) return '暂无第二候选点，暂不生成反向解释。';

  const reasons = [];

  if (runnerUp.fairness < best.fairness) {
    reasons.push(`公平性比首选低 ${best.fairness - runnerUp.fairness} 分`);
  }
  if (runnerUp.access < best.access) {
    reasons.push(`整体可达性低 ${best.access - runnerUp.access} 分`);
  }
  if (runnerUp.scene < best.scene) {
    reasons.push(`场景匹配度低 ${best.scene - runnerUp.scene} 分`);
  }

  if (!reasons.length) {
    reasons.push('虽然综合体验接近，但稳定性略逊于首选方案');
  }

  return `未优先推荐 ${runnerUp.poi.name}，主要因为${reasons.join('、')}。`;
}
