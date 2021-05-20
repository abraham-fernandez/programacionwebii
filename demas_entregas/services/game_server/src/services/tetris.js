const figuresPosition = [
    [{"y": 0, "x": 0}, {"y": 0, "x": 1}, {"y": 1, "x": 0}, {"y": 1, "x": 1}],
    [{"y": 2, "x": 0}, {"y": 2, "x": 1}, {"y": 1, "x": 1}, {"y": 0, "x": 1}],
    [{"y": 0, "x": 0}, {"y": 1, "x": 0}, {"y": 2, "x": 0}, {"y": 3, "x": 0}],

]

const buildBoard = () => {
    const board = Array(16)
    for (var i = 0; i < 16; i++) {
        board[i] = new Array(10).fill('0'); // make each element an array
    }

    let res = {
        position: figuresPosition[Math.floor(Math.random() * 3)],
        board,

    };

    res.board = startPiece(board, res.position)

    return res;
}
//movemos la pieza
const move = (currentState) => {
    const {position}=currentState
    position.sort((a, b) => b.y < a.y ? 1 : -1)

    let newState = controls(currentState)

    return newState;
}

//colocamos la pieza arriba
const startPiece = (board, position) => {

    position.forEach(coord => {

        board[coord.y][coord.x] = "1"
    })

    return board;
}

//mover pieza hacia abajo
const moveDown = (currentState) => {

    if (currentState.position.some(coord => coord.y > 14) || currentState.board[currentState.position[3].y + 1][currentState.position[3].x] === '1') {
        currentState.position = figuresPosition[Math.floor(Math.random() * 3)]
        currentState.board=deleteRow(currentState.board)
    } else {
        currentState.position.forEach(coord => {
            currentState.board[coord.y][coord.x] = "0"
        })
        currentState.position.forEach(coord => {
            currentState.board[coord.y + 1][coord.x] = "1"
            coord.y += 1
        })
    }


    return currentState
}

//mover pieza hacia derecha
const moveRight = (currentState) => {


    if (currentState.position.some(coord => coord.x === 9)) {
        return currentState;
    } else if (currentState.board[currentState.position[3].y][currentState.position[3].x + 1] === '1') {
        currentState.position = figuresPosition[Math.floor(Math.random() * 3)]
    } else {
        currentState.position.forEach(coord => {
            currentState.board[coord.y][coord.x] = "0"
        })
        currentState.position.forEach(coord => {
            currentState.board[coord.y][coord.x + 1] = "1"
            coord.x += 1
        })
    }
    return currentState
}

//mover pieza hacia izquierda
const moveLeft = (currentState) => {

    if (currentState.position.some(coord => coord.x === 0)) {
        currentState.position = figuresPosition[Math.floor(Math.random() * 3)]
    }else {
        currentState.position.forEach(coord => {
            currentState.board[coord.y][coord.x] = "0"
        })
        currentState.position.forEach(coord => {
            currentState.board[coord.y][coord.x - 1] = "1"
            coord.x -= 1
        })
    }

    return currentState
}
const deleteRow=(board)=>{

    let iter = 0;

    board.forEach(element=>{
        if(!element.find(cell=>cell==='0')) {
            board.splice(iter,1)
            board.unshift( new Array(10).fill('0'))
        }
        iter++;
    })


    return board;
}

const controls = (currentState) => {

    switch (currentState.direction.toString()) {
        case "right":
            return moveRight(currentState);
            break;
        case "left":
            return moveLeft(currentState);
            break;
        case "down":
            return moveDown(currentState);
            break;
        default:
            throw new Error("Control no permitido");
    }
}

module.exports = {buildBoard, move};