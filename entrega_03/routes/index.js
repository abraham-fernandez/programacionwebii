const express = require("express");
const tetrisController = require("../controllers/tetrisController.js");

const router = express.Router();

router.get("/tetris", tetrisController.get);


module.exports = router;
