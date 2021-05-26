const {GraphQLServer} = require("graphql-yoga");
const fetch = require("node-fetch");
const {v4: uuidv4} = require('uuid');
const fetchJson = (...args) => fetch(...args).then(response => response.json());

const typeDefs = `
    type Query {
        pair(key:ID!,id:ID,status:String):Pair,
        pairs(status:String): [Stat]
        pairsById(idGame:ID!): Stat
        pairsTopThree : [Top],
        numGames:Int
    }
    type Mutation {
        createStat(player:String!,estado:String!,gameScore:Int!) : Stat,
        changeState(id:ID,estado:String!,player:String!) :Stat
    }
    type Pair {  
        key:ID,       
        applicationId:String,
        value: [Stat]
    }
    
    type Stat{
        id: ID,
        player:String            
        estado:String,
        gameScore:Int
    }
    type Top{
        player:String,
        gameScore:Int
    }
`;

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const config = {method: "GET", headers: {"x-application-id": "abraham.fernandez.dev"}}
const resolvers = {
    Query: {
        //estadisticas por jugador
        pair: (_, {key, id, status}) => {
            config.method = "GET";
            delete config.body;
            return fetchJson(`${BASE_URL}/pairs/${key}/`, config).then(res => {
                if (!res.hasOwnProperty('message')) {

                    return {
                        key: res.key,
                        applicationId: res.applicationId,
                        value: id ? JSON.parse(res.value).filter(stat => stat.id === id) : JSON.parse(res.value)
                    }
                }
            })

        },
        pairsById: (_, {idGame}) => {
            config.method = "GET";
            delete config.body;

            return fetchJson(`${BASE_URL}/pairs/`, config).then(res => {

                if (!res.hasOwnProperty('message'))
                    return res.map(stats => {
                            if (stats.value !== "{}") {
                                return JSON.parse(stats.value).find(stat => stat.id === idGame)
                            }
                        }
                    ).filter(x => x !== undefined).flat()[0]
            })

        },
        //todas las estadisticas
        pairs: (_, {status}) => {
            config.method = "GET";
            delete config.body;

            return fetchJson(`${BASE_URL}/pairs/`, config).then(res => {

                if (!res.hasOwnProperty('message'))
                    return  status ? res.map(stat => JSON.parse(stat.value).filter((s) => s.estado === status)).flat() :
                        res.map(stat => JSON.parse(stat.value).map((s) => s)).flat()
            })

        },
        pairsTopThree: (_) => {
            config.method = "GET"
            delete config.body
            let top = [];
            return fetchJson(`${BASE_URL}/pairs/`, config).then(res => {
                if (!res.hasOwnProperty('message')) {
                    res.map(e => {
                        let data = JSON.parse(e.value).sort((a, b) => b.gameScore - a.gameScore)
                        top.push({player: data.slice(0, 1)[0].player, gameScore: data.slice(0, 1)[0].gameScore})
                    })
                    return top.sort((a, b) => b.gameScore - a.gameScore).slice(0, 3);
                }
            })
        },
        numGames: (_) => {
            config.method = "GET"
            delete config.body
            let numGames = 0;
            return fetchJson(`${BASE_URL}/pairs/`, config).then(res => {
                if (!res.hasOwnProperty('message')) {
                    res.map(e => {

                        numGames += JSON.parse(e.value).length
                    })
                    return numGames;
                }
            })

        }
    },
    Mutation: {
        createStat: async (_, args) => {  //obtener partidas anteriores

            return await fetchJson(`${BASE_URL}/pairs/${args.player}/`, config).then(async (r) => {

                if (!r.hasOwnProperty('message')) {
                    let partidas = [];

                    if (r.value !== "{}") {
                        partidas = JSON.parse(r.value);
                    }

                    config.method = "PUT";
                    const newPartida = {
                        id: uuidv4(),
                        player: args.player.toString(),
                        estado: args.estado.toString(),
                        gameScore: parseInt(args.gameScore)
                    }

                    partidas.push(newPartida);


                    config.body = JSON.stringify(partidas);

                    await fetchJson(`${BASE_URL}/pairs/${args.player}`, config);
                    return newPartida;
                }
            })
        }
        ,
        changeState: (_, args) => {
            config.method = "GET";
            delete config.body
            return fetchJson(`${BASE_URL}/pairs/${args.player}/`, config).then(r => {
                let partidas = [];
                if (!r.hasOwnProperty('message')) {
                    if (r.value) {
                        partidas = JSON.parse(r.value)

                        partidas.find(partida => partida.id === args.id).estado = args.estado

                        config.method = "PUT";
                        config.body = JSON.stringify(partidas)
                        fetchJson(`${BASE_URL}/pairs/${args.player}`, config);

                        return partidas.find(partida => partida.id === args.id)
                    }
                }
            });

        }


    },
    Stat: {
        id: stat => stat.id,
        player: stat => stat.player,
        estado: stat => stat.estado,
        gameScore: stat => stat.gameScore
    }
}


const server = new GraphQLServer({typeDefs, resolvers});

server.start({
    playground: "/",
    port: process.env.PORT
});



