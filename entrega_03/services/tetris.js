const buildBoard=()=>{

    return new Array(16).fill(new Array(10).fill('0'));
}

const move=(position,board,tetrominio)=>{
    position=[{y:0,x:0},{y:0,x:1},{y:1,x:0},{y:1,x:1}]

    position.forEach(position=>board[position.x][position.y]=1)
    return board;



}

module.exports={buildBoard,move};