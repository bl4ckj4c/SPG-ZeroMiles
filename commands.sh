#!/bin/bash

apt-get update

echo "apt-get install -y git"
apt-get install -y git

echo "apt-get install -y npm"
apt-get install -y npm

echo "apt-get install -y nodejs"
apt-get install -y nodejs

echo "git clone https://github.com/bl4ckj4c/polito-se2-21-01"
git clone https://github.com/bl4ckj4c/polito-se2-21-01

cd polito-se2-21-01

echo "git checkout origin/master"
git checkout origin/master

echo "installing server modules..."
cd Server/
npm i

echo "installing my-app modules..."
cd ../my-app
npm i

echo "starting server & client"
npm start & (cd ../Server && node server.js)

