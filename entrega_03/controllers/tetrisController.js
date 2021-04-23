const tetrisController=require('../services/tetris.js');

const get = (req, res) => {

    const {player}=req.query
    const board= tetrisController.buildBoard()
    const match={
        player,
        board
    }
    res.json(match);
};

const placePiece=(req,res)=>{
    const {player,board,direction}=req.body

    let newBoard = tetrisController.move(board,direction)
    const response={
        player,
        board:newBoard
    }
    return res.json(response)
}

module.exports = { get,placePiece };