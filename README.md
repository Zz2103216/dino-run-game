<p align="center">
  <img src="https://img.shields.io/badge/status-live%20demo-brightgreen" alt="Live Demo">
  <img src="https://img.shields.io/badge/players-1--2-blue" alt="Players">
  <img src="https://img.shields.io/badge/license-MIT-yellow" alt="License">
</p>

# 🦖🔫 Armed Dino Runner — HTML5 跑酷射击游戏

> 一款功能丰富的像素风横版跑酷射击游戏。单人经典模式 + 双人实时联机对战，内置 BOSS 战、弹幕系统、弹药/护盾机制，开箱即用。

## 🎮 Live Demo

🔗 **[在线试玩 →](https://zz2103216.github.io/dino-run-game/)**

## ✨ 核心卖点

- 🏃 **经典跑酷** — 跳跃、匍匐躲避障碍物，手感流畅
- 🔫 **射击系统** — 鼠标瞄准 + 点击/键盘开火，击杀飞行敌人
- 🐉 **BOSS 战** — 每 50 分触发巨龙 BOSS，弹幕密度逐级递增
- 🛡️ **护盾 & 弹药** — 击杀敌人获得护盾，地面拾取弹药补给
- 🌐 **实时双人对战** — Socket.IO 联机大厅，房间号匹配，同屏竞分
- 🎨 **10 种恐龙配色** — 联机模式可选角色外观
- 📱 **响应式布局** — 桌面端 + 移动端自适应
- 💰 **广告位就绪** — 预留 Google AdSense 横幅位，改配置即可投放
- 📖 **教学引导** — 菜单 → 教程 → 倒计时 → 游戏 → 结束，完整状态机

## 🕹️ 操作一览

| 操作 | 按键 |
|------|------|
| 跳跃 | <kbd>空格</kbd> / <kbd>↑</kbd> |
| 匍匐躲避 | <kbd>↓</kbd> |
| BOSS 走位 | <kbd>A</kbd> / <kbd>D</kbd> |
| 瞄准 | 鼠标移动 |
| 射击 | <kbd>J</kbd> / <kbd>Enter</kbd> / 鼠标左键 |

## 📦 包含内容

```
dino-run-game/
├── index.html          # 游戏主文件（~1700 行，全部前端逻辑）
├── server.js           # Node.js + Express + Socket.IO 联机服务端
├── package.json        # 依赖声明
├── run_server.sh       # 一键启动脚本
└── README.md
```

## 🚀 部署方式

### 静态部署（单人模式）

将 `index.html` 放到任何静态托管平台即可运行单人模式：

- **GitHub Pages** — 已部署 👉 [zz2103216.github.io/dino-run-game](https://zz2103216.github.io/dino-run-game/)
- **Vercel / Netlify** — 拖拽上传
- **任意 Web 服务器** — 放到 web 根目录

### 完整部署（含双人对战）

```bash
npm install
npm start
# 访问 http://localhost:3000
```

推荐生产环境托管：Render / Railway / VPS + PM2

## 💰 变现能力

游戏已内置 Google AdSense 广告位（顶部 728×90 + 底部 728×90 + 移动端 320×50），只需：

1. 注册 [Google AdSense](https://adsense.google.com)
2. 填入发布商 ID 和广告单元 ID 到 `AD_CONFIG`
3. 将 `AD_CONFIG.enabled` 改为 `true`

## 🔧 技术栈

| 层 | 技术 |
|-----|------|
| 前端 | HTML5 Canvas, 原生 JavaScript（无框架） |
| 联机 | Socket.IO v4 |
| 服务端 | Node.js + Express |
| 存储 | localStorage（最高分持久化） |

## 📄 License

MIT — 购买后可自由修改、商用、转售。
