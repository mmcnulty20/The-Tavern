const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");

const config = require("./webpack.common")
const compiler = webpack(config);

const app = express();
const http = require("http").createServer(app);
// var io = import("socket.io")(http)

console.log("server")

// app.use(express.static(path.join(__dirname, "public")));

app.use(webpackMiddleware( compiler,  {
    publicPath: config.output.publicPath,
} ));


// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/public/dist/index.html")
// });

// io.on("connection", socket => {
//     console.log("user connected");
//     socket.on("disconnect", () => {
//         console.log("disconnected")
//     })
// })

app.listen(3000, () => {
    console.log("listening on *:3000")
})