const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const server = require("http").createServer(app);
const path = require("path");
const ejs = require("ejs");
const socketEstablisher = require("../be/Sockets/sockets");
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views/templates"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "*",
    })
);
socketEstablisher(wss);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/console", (req, res) => {
    res.render("console");
});
server.listen(3000, () => {
    console.log("started");
});
