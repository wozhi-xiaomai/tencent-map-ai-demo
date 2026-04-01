# AI 多人出行汇合点推荐助手

一个面向征文/作品展示场景设计的前端 Demo，主题是：**基于 AI + 地图能力，为多人聚会/会面场景推荐更公平、更好达、更可解释的汇合点。**

## 在线访问

- Demo: https://wozhi-xiaomai.github.io/tencent-map-ai-demo/
- Article: https://wozhi-xiaomai.github.io/tencent-map-ai-demo/article.html

## 当前已完成（无需 key）

这部分已经可以独立开发、展示和继续打磨：

- Demo 页面与征文文章页
- 多人成员输入与交互编辑
- 本地 mock 候选点数据
- 多维评分逻辑拆分：
  - 公平性
  - 可达性
  - 场景匹配度
- 推荐结果排名与可视化路径展示
- 推荐解释文案生成
- 方案摘要与“为什么不是第二名”的反向解释
- 可手动调节公平性 / 可达性 / 场景匹配权重
- 已预留腾讯地图底图接入能力（填写 key 后可尝试真实地图）
- 配置层 / API 占位层拆分，方便后续接真实服务

## 项目结构

- `index.html`：交互式 Demo 页面
- `article.html`：征文风格文章页
- `src/config.js`：应用配置与功能开关
- `src/mock-data.js`：本地演示数据
- `src/scoring.js`：多人汇合点评分逻辑
- `src/explainer.js`：解释文案生成
- `src/api.js`：真实 API 接入占位层
- `docs/next-step.md`：后续接 key 的实施清单

## 项目亮点

- 围绕“AI + 地图”的真实多人决策场景
- 不是单人导航，而是多人汇合点公平推荐
- 强调可解释性、可视化和作品展示感
- 适合作为 CSDN / 征文 / 比赛配套演示页
- 已提前把未来真实 API 接入点隔离，便于继续开发

## 后续只差 key 的部分

后面接入真实能力时，重点补这几块：

- 真实 POI 检索
- 真实路线规划 / 通勤时间估算
- 大模型解释排序
- 环境变量 / 密钥配置
- 接口失败兜底与限流处理

详见：`docs/next-step.md`
