const assert = require("assert");
const fetch=require('node-fetch')
const url="http://localhost:4000";
const player="abraham"

describe("placePiece cuadrado", () => {
    describe("POST /GAME/tetris/actions/placePiece", () => {
        //TEST to get new game
        it("should get player and new empty board", async() => {
            await fetch(`${url}/game/tetris/actions/placePiece`,{
                method:"POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "player":"abrit",
                    "position" : [{"y": 3, "x": 0}, {"y": 3, "x": 1}, {"y": 4, "x": 0}, {"y": 4, "x": 1}],
                    "board": [
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ],
                        [
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0",
                            "0"
                        ]
                    ],
                    "direction":"down"
                })
            })
                .then((res) => {

                    return res.json()
                })
                .then((res) => {

                    assert.equal(typeof res,'object')
                    assert.equal(res.board.length,16)
                    assert.equal(res.board[4][0],1)
                    assert.equal(res.board[4][1],1)
                    assert.equal(res.board[5][0],1)
                    assert.equal(res.board[5][1],1)


                })
        })
    })
})