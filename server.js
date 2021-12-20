const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app)

app.use(cors())
app.use('/public', express.static(__dirname + "/public/"))

app.get('/', function(req, res) {
    res.redirect('/public/fractol.html')
});

// Lancer le serveur
server.listen(3000)
