#!/bin/bash

echo "git clone https://github.com/bl4ckj4c/polito-se2-21-P01-SPG"
git clone https://github.com/bl4ckj4c/polito-se2-21-P01-SPG

cd polito-se2-21-P01-SPG

echo "git checkout origin/master"
git checkout origin/master

echo "copying keys (test)"
mv ../polito-se2-21-01-spg-firebase-adminsdk-76fui-7b28269ea6.json test/server-test

echo "copying keys (server)"
mkdir server/firebase-server
mv ../config.js server/firebase-server

echo "copying keys (client)"
mkdir my-app/firebase-client
mv ../firebase-config.js my-app/firebase-client
mv ../example.js my-app/firebase-client

echo "installing server modules..."
cd server/
npm i

echo "installing my-app modules..."
cd ../my-app
npm i

echo "starting server & client"
npm start & (cd ../server && node server.js)

