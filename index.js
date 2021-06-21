const express = require('express');
const socket = require('socket.io');

let app = express();

let server = app.listen(4000, function() {
    console.log("Listening to Port 4000");
});

app.use(express.static("public"));

// 서버의 양방향 통신설정
let upgaradeServer = socket(server);
upgaradeServer.on("connection", function(socket) {
    // 클라이언트에서 메세지를 받고 다시 접속된 모든 사람에게 이름과 메세지를 방송한다
    socket.on('sendingMessage', function(data) {
        upgaradeServer.emit('broadcastMessage', data)
    });

    console.log("Websocket connected", socket.id);
})