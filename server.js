const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

// 房间管理
const rooms = {}; // { code: { players: [{id, name, colorIdx, score, kills, alive, isHost}], state } }

function generateRoomCode() {
  let code;
  do { code = String(Math.floor(1000 + Math.random() * 9000)); }
  while (rooms[code]);
  return code;
}

function broadcastRoom(roomCode) {
  const room = rooms[roomCode];
  if (!room) return;
  io.to(roomCode).emit('room-updated', {
    players: room.players.map(p => ({ id: p.id, name: p.name, colorIdx: p.colorIdx, isHost: p.isHost }))
  });
}

io.on('connection', (socket) => {
  console.log(`[连接] ${socket.id}`);

  // 创建房间
  socket.on('create-room', () => {
    const code = generateRoomCode();
    rooms[code] = {
      players: [{ id: socket.id, name: '', colorIdx: 0, score: 0, kills: 0, alive: true, isHost: true }],
      state: 'waiting'
    };
    socket.join(code);
    socket.roomCode = code;
    socket.emit('room-created', {
      code,
      players: rooms[code].players.map(p => ({ id: p.id, name: p.name, colorIdx: p.colorIdx, isHost: p.isHost }))
    });
    console.log(`[房间] ${code} 已创建 (房主: ${socket.id})`);
  });

  // 加入房间
  socket.on('join-room', (data) => {
    const { code, name, colorIdx } = data;
    const room = rooms[code];
    if (!room) { socket.emit('join-error', '房间不存在'); return; }
    if (room.players.length >= 2) { socket.emit('join-error', '房间已满'); return; }
    if (room.state === 'playing') { socket.emit('join-error', '游戏已开始'); return; }

    room.players.push({
      id: socket.id, name: name || '玩家2', colorIdx: colorIdx || 0,
      score: 0, kills: 0, alive: true, isHost: false
    });
    socket.join(code);
    socket.roomCode = code;
    socket.emit('room-joined', { code });
    broadcastRoom(code);
    console.log(`[房间] ${code} ${name} 加入`);
  });

  // 更新玩家信息
  socket.on('player-info', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (player) {
      if (data.name) player.name = data.name;
      if (data.colorIdx !== undefined) player.colorIdx = data.colorIdx;
    }
    broadcastRoom(code);
  });

  // 房主请求开始游戏
  socket.on('request-start', () => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (!player || !player.isHost) return;
    if (rooms[code].players.length < 2) return;

    rooms[code].state = 'playing';
    io.to(code).emit('game-start', {
      players: rooms[code].players.map(p => ({
        id: p.id, name: p.name, colorIdx: p.colorIdx
      }))
    });
    console.log(`[房间] ${code} 游戏开始`);
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
  socket.on('player-shoot', () => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    socket.to(code).emit('remote-shoot', {});
  });

  // 玩家死亡
  socket.on('player-died', (data) => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    const player = rooms[code].players.find(p => p.id === socket.id);
    if (player) player.alive = false;
    socket.to(code).emit('remote-died', data);
  });

  // Boss 击杀
  socket.on('player-boss-kill', () => {
    const code = socket.roomCode;
    if (!code || !rooms[code]) return;
    socket.to(code).emit('remote-boss-kill', {});
  });

  // 断开
  socket.on('disconnect', () => {
    console.log(`[断开] ${socket.id}`);
    const code = socket.roomCode;
    if (code && rooms[code]) {
      rooms[code].players = rooms[code].players.filter(p => p.id !== socket.id);
      if (rooms[code].players.length === 0) {
        delete rooms[code];
        console.log(`[房间] ${code} 已删除`);
      } else {
        // 转移房主
        if (!rooms[code].players.find(p => p.isHost)) {
          rooms[code].players[0].isHost = true;
        }
        socket.to(code).emit('opponent-left');
        broadcastRoom(code);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🦖 武装小恐龙跑酷 - 联机服务器启动: http://localhost:${PORT}`);
});
