const assert = require("assert");
const fetch=require('node-fetch')
const url="http://localhost:4000";
const player="abraham"
describe("newGame", () => {
    describe("GET /game/tetris", () => {
        //TEST to get new game
        it("should get player and new empty board", async() => {
            await fetch(`${url}/game/tetris?player=${player}`)
                .then((res) => {
                    return res.json()
                })
                .then((res) => {

                    assert.equal(typeof res,'object')
                    assert.equal(res.player,player)
                    assert.equal(res.board.length,16)
                })
        })
    })
})