const tetris=require('../services/tetris.js');

const get = (req, res) => {

    const {player}=req.query
    const {board,position}=tetris.buildBoard();
    const match={
        player,
        position,
        board,

    }
    res.json(match);
};

const placePiece=(req,res)=>{


    let data = tetris.move(req.body)


    return res.json(data)
}

module.exports = { get,placePiece };