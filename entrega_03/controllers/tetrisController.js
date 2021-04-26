const tetrisController=require('../services/tetris.js');

const get = (req, res) => {

    const {player}=req.query
    const {board,position}=tetrisController.buildBoard();
    const match={
        player,
        position,
        board
    }
    res.json(match);
};

const placePiece=(req,res)=>{


    let data = tetrisController.move(req.body)


    return res.json(data)
}

module.exports = { get,placePiece };