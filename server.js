const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app)

app.use(express.static(__dirname + "/fractol.html"))
app.use(express.static(__dirname + "/fractol.js"))

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/fractol.html');
});



// Lancer le serveur
server.listen(3000)