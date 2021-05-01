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
    const currentState=req.body

    let newState = tetris.move(currentState)


    return res.json(newState)
}

module.exports = { get,placePiece };