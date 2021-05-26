const Koa = require("koa");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const Router = require("@koa/router");
const fetch=require('node-fetch')

const app = new Koa();
const router = new Router();




router.post("/game", async (ctx) => {
    console.log(process.env.GAME_SERVER_URL)
  //get newgame from tetris
  const {player,position,board}=await fetch(`${process.env.GAME_SERVER_URL}/game/tetris?player=${ctx.request.body.player}`).then(res=>res.json());


  // let state=JSON.stringify({position:position})

 const state=JSON.stringify({position:position,board:board}).toString().replace(/"/gm,"'")


  // 2. post mutation to Stats server to store new game
 const{data}=await fetch(`${process.env.STATS_SERVER_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      query: `mutation{
                      createStat(player:"${player}",estado:"${state}",gameScore:${parseInt(Math.random() * 200)}){
                        id,
                        player,
                        estado,
                        gameScore
                      }
                }`
    })
  }).then(res=>res.json())


  // 3. return state
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    id: data.createStat.id,
    player:player,
    position:position,
    board:board
  });
});

router.get("/game/:id", async (ctx) => {
  // 1. get current state from Stats server
    const{data}=await fetch(`${process.env.STATS_SERVER_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `query{
                        pairsById(idGame:"${ctx.request.params.id}"){
                               id,
                               player,
                               estado
                        }
                    }`
        })
    }).then(res=>res.json())
    let {id,player,estado,gameScore}=data.pairsById
    console.log(estado)
    estado=JSON.parse(estado.replace(/'/gm,'"'))
  // 2. return state

  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
      id: ctx.params.id,
      board:estado.board,
      player:player
  });
});

router.post("/game/:id/event", async(ctx) => {
  // 1. get current state from Stats server
    const{data}=await fetch(`${process.env.STATS_SERVER_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `query{
                        pair(key:"${ctx.request.body.player}",id:"${ctx.params.id}"){
                               value{
                                  id,
                                  player,
                                  estado,
                                  gameScore
                              }
                        }
                    }`
        })
    }).then(res=>res.json())
    let {id,player,estado,gameScore}=data.pair.value[0]
    estado=JSON.parse(estado.replace(/'/gm,'"'))

  // 2. get next state from Game server
    const {position,board}=await fetch(`${process.env.GAME_SERVER_URL}/game/tetris/actions/placePiece`,{
        method: 'POST',
        headers: {'Accept': 'application/json','Content-Type': 'application/json'},
        body:JSON.stringify({
            "player":ctx.request.body.player,
            "position" : estado.position,
            "board":estado.board,
            "direction":ctx.request.body.direction
        })
    }).then(res=>res.json());
  // 3. post mutation to Stats server to store next state
    const state=JSON.stringify({position:position,board:board}).toString().replace(/"/gm,"'")
    let newData={};
    await fetch(`${process.env.STATS_SERVER_URL}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `mutation{
                        changeState(player:"${ctx.request.body.player}",estado:"${state}",id:"${ctx.params.id}"){                           
                              id,
                              player,
                              estado,
                              gameScore
                       }
                          
                    }`
        })
    }).then(res=>res.json()).then(res=>newData=res.data.changeState)

    estado=JSON.parse(newData.estado.replace(/'/gm,'"'))

  // 4. return state
  ctx.response.set("Content-Type", "application/json");
  ctx.body = JSON.stringify({
    id: ctx.params.id,
      player:ctx.request.body.player,
      position:estado.position,
      board:estado.board
  });
});

app.use(koaBody());
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT);
