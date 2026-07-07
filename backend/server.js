const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors({ origin: "*" }));

app.get('/', (req, res) => res.send('Backend Ativo!'));

const server = http.createServer(app);

const io = new Server(server, { 
    path: "/socket.io/",
    maxHttpBufferSize: 1e7, // Aumenta o limite para ~10MB para aguentar os áudios
    cors: { 
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    } 
});

io.on('connection', (socket) => {
    socket.on('envia_mensagem', (dados) => {
        io.emit('recebe_mensagem', dados);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));