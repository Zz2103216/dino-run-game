#!/bin/bash
cd /Users/zhangjinglei/dino-run-game
while true; do
  node server.js
  echo "Server crashed, restarting in 2s..."
  sleep 2
done
