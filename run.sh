#!/bin/sh

cd ~/icns-smart-plant-server/Smart-Plant-Dashboard

nohup npm run serve &

echo "2. dashboard web server started..."

cd ~

exit
