const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

// 房间管理
const rooms = {}; // { roomCode: { players: [{id, name}], state: 'waiting'|'playing' } }

function generateRoomCode() {
  let code;
  do { code = String(Math.floor(1000 + Math.random() * 9000)); }
  while (rooms[code]);
  return code;
}

io.on('connection', (socket) => {
  console.log(`[连接] ${socket.id}`);

  // 创建房间
  socket.on('create-room', () => {
    const code = generateRoomCode();
    rooms[code] = {
      players: [{ id: socket.id, score: 0, kills: 0, alive: true }],
      state: 'waiting'
    };
    socket.join(code);
    socket.roomCode = code;
    socket.emit('room-created', { code });
    console.log(`[房间] ${code} 已创建`);
  });

  // 加入房间
  socket.on('join-room', (code) => {
    const room = rooms[code];
    if (!room) {
      socket.emit('join-error', '房间不存在');
      return;
    }
    if (room.players.length >= 2) {
      socket.emit('join-error', '房间已满');
      return;
    }
    room.players.push({ id: socket.id, score: 0, kills: 0, alive: true });
    room.state = 'playing';
    socket.join(code);
    socket.roomCode = code;
    socket.emit('room-joined', { code });
    // 通知双方开始
    io.to(code).emit('game-start', { playerCount: room.players.length });
    console.log(`[房间] ${code} 玩家加入，开始对战`);
  });

  // 玩家状态同步
  socket.on('player-update', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    socket.to(code).emit('remote-update', data);
  });

  // 分数更新
  socket.on('player-score', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (player) { player.score = data.score; player.kills = data.kills; }
    socket.to(code).emit('remote-score', data);
  });

  // 射击
  socket.on('player-shoot', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    socket.to(code).emit('remote-shoot', data);
  });

  // 玩家死亡
  socket.on('player-died', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (player) player.alive = false;
    socket.to(code).emit('remote-died', data);
    // 检查对方是否也死了
    const allDead = rooms[code].players.every(p => !p.alive);
    if (allDead) {
      io.to(code).emit('game-draw', { players: rooms[code].players.map(p => ({ id: p.id, score: p.score, kills: p.kills })) });
    }
  });

  // Boss 击杀
  socket.on('player-boss-kill', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    socket.to(code).emit('remote-boss-kill', data);
  });

  // 断开连接
  socket.on('disconnect', () => {
    console.log(`[断开] ${socket.id}`);
    const code = socket.roomCode;
    if (code && rooms[code]) {
      rooms[code].players = rooms[code].players.filter(p => p.id !== socket.id);
      socket.to(code).emit('opponent-left');
      if (rooms[code].players.length === 0) {
        delete rooms[code];
        console.log(`[房间] ${code} 已删除`);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🦖 武装小恐龙跑酷 - 联机服务器启动: http://localhost:${PORT}`);
});
