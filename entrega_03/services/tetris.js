//TODO: Hacer test inicio partida
//TODO: Hacer test moveDown
//TODO: Hacer test moveRight
//TODO: Hacer test moveLeft
//TODO: Hacer test controlChoque

const figuresPosition=[
    [{"y": 0, "x": 0}, {"y": 0, "x": 1}, {"y": 1, "x": 0}, {"y": 1, "x": 1}],
    [{"y":2,"x":0},{"y":2,"x":1},{"y":1,"x":1},{"y":0,"x":1}]
]

const buildBoard = () => {
    const board = Array(16)
    for (var i = 0; i < 16; i++) {
        board[i] = new Array(10).fill('0'); // make each element an array
    }

    let res = {
        position:figuresPosition[Math.floor(Math.random() * 2)] ,
        board
    };

    res.board = startPiece(board, res.position)

    return res;
}
//movemos la pieza
const move = (res) => {

    res.position.forEach(coord => {
        res.board[coord.y][coord.x] = "0"
    })

    let data = controls(res)

    return {...data};
}
//TODO  controlar limites del tablero
//colocamos la pieza arriba
const startPiece = (board, position) => {

    position.forEach(coord => {

        board[coord.y][coord.x] = "0"
    })

    return board;
}
//mover pieza hacia abajo
const moveDown = (req) => {

    req.position.forEach(coord => {

        req.board[coord.y + 2][coord.x] = "1"

        coord.y += 2
    })


    return req
}

//mover pieza hacia derecha
const moveRight = (req) => {

    req.position.forEach(coord => {

        if (coord.x <= 7) {
            req.board[coord.y][coord.x + 2] = "1"
            coord.x += 2
        } else {
            throw new Error("Limite tablero")
        }

    })

    return req
}

//mover pieza hacia izquierda
const moveLeft = (req) => {

    req.position.forEach(coord => {
        if (coord.x >= 1) {
            req.board[coord.y][coord.x - 2] = "1"
            coord.x -= 2
        } else {
            throw new Error("Limite tablero")
        }
    })
    return req
}

const controls = (res) => {

    switch (res.direction.toString()) {
        case "right":
            return moveRight(res);
            break;
        case "left":
            return moveLeft(res);
            break;
        case "down":
            return moveDown(res);
            break;
        default:
            throw new Error("Control no permitido");
    }
}

module.exports = {buildBoard, move};