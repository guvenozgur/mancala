"use strict"

const express = require('express');
const app = express();
const config = require('../config/Config');
const server = require('http').Server(app);

const socket = require('socket.io')(server);
const {initSocket} = require('./socket/MancalaSocket');

const PORT = process.env.PORT || config.SERVER_PORT;

const mongoose = require('mongoose');
const cors = require('cors')

const gameController = require('./controller/GameController');
const authController = require('./controller/Authentication');

const corsOptions = {
    origin: [
        "http://localhost:8080"
    ],
    credentials: true,
    exposedHeaders: ["set-cookie"],
};


(async function initialize(){
    await initMongo();
    app.use('/', cors(corsOptions));
    app.use('/auth', authController());
    app.use('/play', gameController());
    await initSocket(socket);

})();

async function initMongo(){
    return new Promise((resolve, reject)=>{
        mongoose.connect(config.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        const db = mongoose.connection;

        db.on('error', (err) => {
            console.log(err);
            reject();
        })
        db.on('open', () => {
            console.log('Mongo db connected');
            resolve();
        })
    })
}


server.listen(PORT);
