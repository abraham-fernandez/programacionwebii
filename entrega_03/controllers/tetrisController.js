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
    const {player,board}=req.body

     const newBoard= tetrisController.move('',board,'')
    return res.json(newBoard)
}

module.exports = { get,placePiece };