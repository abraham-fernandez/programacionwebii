const tetrisController=require('../services/tetris.js');

const get = (req, res) => {

    const {player}=req.query

    debugger
    const board= tetrisController.buildBoard()
    const match={
        player,
        board
    }
    res.json(match);
};

module.exports = { get };