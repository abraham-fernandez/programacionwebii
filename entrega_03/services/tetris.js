let oldPosition=[];
let position=[{"y": 0, "x": 0}, {"y": 0, "x": 1}, {"y": 1, "x": 0}, {"y": 1, "x": 1}]
const buildBoard = () => {
    oldPosition=[];
    return new Array(12).fill(new Array(6).fill('0'));
}
//movemos la pieza
const move = (board,direction) => {

    if(oldPosition.length>0){
        oldPosition.forEach(position => {

            board[position.y][position.x] = "0"
        })

        board= controls(direction,board)


    }else{

        board=  startPiece(board)
    }


    return board;
}
//TODO  cambiar a metodo
//colocamos la pieza arriba
const startPiece=(board)=>{
    position.forEach(position => {
        board[position.y][position.x] = "1"
    })
    oldPosition=position

    return board;
}
//mover pieza hacia abajo
const moveDown = (board) => {

    oldPosition.forEach(position => {
       board[position.y+2][position.x] = "1"
        position.y+=2
    })

    return board
}

//mover pieza hacia derecha
const moveRight = (board) => {

    oldPosition.forEach(position => {
        board[position.y][position.x+2] = "1"

        position.x+=2
    })
    console.log(oldPosition)
    return board
}

//mover pieza hacia izquierda
const moveLeft = (board) => {

    oldPosition.forEach(position => {
        board[position.y][position.x-2] = "1"
        position.x-=2
    })
    return board
}

const controls=(direction,board)=>{

    switch (direction.toString()){
        case "right":
           return moveRight(board);
            break;
        case "left":
           return moveLeft(board);
            break;
        case "down":
           return moveDown(board)
            break;
        default:
                throw new Error("Control no permitido")
    }
}

module.exports = {buildBoard, move};