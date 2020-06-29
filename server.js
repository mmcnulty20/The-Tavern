const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");

const config = require("./webpack.common")
const compiler = webpack(config);

const app = express();
const http = require("http").createServer(app);
var io = require("socket.io")(http)

const gameState = {
    players: {},
}
let ready = 0
let playerOrder;

// app.use(express.static(path.join(__dirname, "public")));

app.use(webpackMiddleware( compiler,  {
    publicPath: config.output.publicPath,
} ));


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/dist/index.html")
// });

io.on("connection", socket => {
    socket.on("disconnect", () => {
        delete gameState.players[socket.id]
    })
    socket.on("new player", ({name, color, textColor}) => {
        gameState.players[socket.id] = { name, color, textColor } 
    })
    socket.on("ready", () => {
        ready += 1
    })
    socket.on("shuffled order", order => {
        playerOrder = order
    })
    socket.on("roll", roll => {
        socket.broadcast.emit("roll", roll)
    })
    socket.on("hold", () => {
        socket.broadcast.emit("hold")
    })
})

const numPlayers = () => Object.keys(gameState.players).length

setInterval( () => {
    io.sockets.emit("state", gameState);
    if ( ready === numPlayers() ) {
        const controllingPlayer = Object.keys(gameState.players)[( Math.floor(Math.random() * numPlayers() ))]
        io.sockets.emit("all ready", controllingPlayer);
        ready = 0;
    }
    if ( playerOrder ) {
        io.sockets.emit("player order", playerOrder)
        playerOrder = null
    }
}, 100 )

http.listen($PORT, () => {
    
})