# 📦 售卖套餐 — Armed Dino Runner

## 🎯 推荐售卖渠道（按优先级）

### 1. itch.io（最推荐，免费上架）
- **网址**: https://itch.io
- **适合**: 独立游戏，HTML5 游戏
- **抽成**: 可自定义（0%~30%，默认 10%）
- **定价建议**: $4.99 ~ $9.99（源码 + 完整项目）
- **付款**: PayPal / Stripe，支持人民币提现

### 2. CodeCanyon（Envato Market）
- **网址**: https://codecanyon.net
- **适合**: 游戏源码、模板交易
- **抽成**: 独家 12.5%~37.5%，非独家 55%
- **定价建议**: $12 ~ $29
- **注意**: 审核较严格，需要提交完整源码包

### 3. Flippa（卖网站/生意）
- **网址**: https://flippa.com
- **适合**: 已有流量和收入的网站
- **条件**: 需要先跑出 DAU/广告收入才有价值
- **当前不推荐** — 先积累用户再说

### 4. 国内渠道
- **爱发电** (afdian.com) — 创作者变现
- **面包多** — 数字商品交易
- **直接联系** 4399 / 微信小游戏 等平台商务

---

## 📝 CodeCanyon 商品描述（中英双语）

### 英文版

```
Armed Dino Runner — HTML5 Side-Scrolling Shooter Game

A feature-rich pixel-art runner game built with pure HTML5 Canvas and JavaScript.
No frameworks required! Includes single-player classic mode AND real-time 2-player
multiplayer with Socket.IO.

KEY FEATURES:
- Classic endless runner: jump & duck to avoid obstacles
- Shooting system: mouse aim + click/j-key to fire
- Boss battles every 50 points with escalating bullet-hell patterns
- Shield & ammo mechanics: kill eagles for shields, collect ammo crates
- Real-time 2-player multiplayer with lobby system (Socket.IO)
- 10 playable dino color skins
- Responsive design for desktop & mobile
- Google AdSense ad slots pre-integrated (ready to monetize)
- Complete game state machine: Menu → Tutorial → Countdown → Playing → Game Over
- LocalStorage high-score persistence

WHAT'S INCLUDED:
- index.html — Full game source (~1700 lines, well-structured)
- server.js — Node.js + Express + Socket.IO multiplayer server
- package.json — Dependencies & scripts
- run_server.sh — One-click launch script
- Full documentation (Chinese)

TECH STACK:
Frontend: HTML5 Canvas, Vanilla JavaScript (zero dependencies)
Backend: Node.js, Express, Socket.IO v4
Storage: localStorage

DEPLOYMENT:
- Static hosting (single player): GitHub Pages, Vercel, Netlify
- Full stack (with multiplayer): Render, Railway, VPS + PM2

LIVE DEMO: https://zz2103216.github.io/dino-run-game/
```

### 中文版

```
武装小恐龙跑酷 — HTML5 横版射击游戏

纯 HTML5 Canvas + 原生 JavaScript 打造的丰富跑酷射击游戏。
零框架依赖！包含单人经典模式 + Socket.IO 双人实时联机对战。

核心功能：
- 经典无限跑酷：跳跃/匍匐躲避障碍
- 射击系统：鼠标瞄准 + 点击/J键开火
- BOSS 战：每 50 分触发巨龙，弹幕难度递增
- 护盾 & 弹药机制：击杀老鹰获护盾，拾取弹药箱补子弹
- 双人实时联机：大厅系统，房间号匹配，同屏竞分
- 10 种可选恐龙配色
- 响应式布局，桌面+移动端自适应
- 内置 Google AdSense 广告位（开配置即可变现）
- 完整状态机：菜单→教程→倒计时→游戏→结束
- localStorage 最高分持久化

包含文件：
- index.html（~1700 行，结构清晰）
- server.js（Node.js + Express + Socket.IO 联机服务端）
- package.json
- 完整文档

技术栈：HTML5 Canvas / 原生 JS / Node.js / Socket.IO v4
在线试玩：https://zz2103216.github.io/dino-run-game/
```

---

## 🎬 录制演示 GIF

在 macOS 上：

```bash
# 方法1: 用系统自带录屏
# Cmd+Shift+5 → 选择"录制所选部分" → 播放游戏 15-30 秒

# 方法2: 用 ffmpeg 录制（先安装 brew install ffmpeg）
ffmpeg -f avfoundation -i "1:0" -t 20 -vf "fps=15,scale=640:-1" demo.gif
```

将录好的 `demo.gif` 放到仓库根目录，在 README 中添加：
```markdown
![Game Demo](demo.gif)
```

---

## 📸 截图建议

需要截取以下画面（放到 `/screenshots/` 目录）：
1. 主菜单界面
2. 游戏进行中（有分数）
3. BOSS 战画面
4. 联机大厅
5. 移动端效果

---

## 🚀 上架前 Checklist

- [ ] 录制 20-30 秒演示 GIF
- [ ] 截取 5+ 张高清截图
- [ ] 注册 itch.io 账号 → 创建新项目 → 填入描述 → 设置价格
- [ ] （可选）注册 CodeCanyon → 提交审核
- [ ] 在社交媒体分享 Demo 链接引流
- [ ] 考虑部署完整联机版到 Render/Railway（免费额度）

---

## 💡 定价策略

| 平台 | 建议价格 | 理由 |
|------|---------|------|
| itch.io | $4.99 ~ $9.99 | 独立游戏受众，冲动消费友好 |
| CodeCanyon | $14 ~ $29 | 源码市场，包含服务端代码 |
| 国内平台 | ¥19.9 ~ ¥49.9 | 中文受众，价格亲民 |

建议先在 itch.io 以 $4.99 上架测试市场反应，有销量后提价。
