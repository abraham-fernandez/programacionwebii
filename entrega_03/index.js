const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const lifeRoutes = require("./routes/index.js");

const server = express();
server.use(bodyParser.json());

server.use(cors());

server.get("/game/", (req, res) => {
   // res.send("Hello World");
});




server.use("/game", lifeRoutes);

server.listen(process.env.PORT || 8080);
