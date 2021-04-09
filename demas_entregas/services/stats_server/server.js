const {GraphQLServer} = require("graphql-yoga");
const fetch = require("node-fetch");
const {v4: uuidv4} = require('uuid');
const fetchJson = (...args) => fetch(...args).then(response => response.json());

const typeDefs = `
    type Query {
        pair(key:ID!, status:String):Pair,
        pairs: [Pair]
    }
    type Mutation {
        createStat(player:String!,gameScore:Int!) : Stat!
    }
    type Pair {  
        key:ID,       
        applicationId:String,
        value: [Stat]
    }
    
    type Stat{            
         estado:String,
         gameScore:Int
    }
`;

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const config = {method: "GET", headers: {"x-application-id": "abraham.fernandez"}}
const resolvers = {
    Query: {
        //estadisticas por jugador
        pair: (_, {key,status}) => {
            config.method = "GET";
            delete config.body;
            return fetchJson(`${BASE_URL}/pairs/${key}/`, config).then(res => ({
                key: res.key,
                applicationId: res.applicationId,
                value: status ? JSON.parse(res.value).filter(stat=>stat.estado===status) :JSON.parse(res.value)
            }))
        },
        //todas las estadisticas
        pairs: (_,) => {
            config.method = "GET";
            return fetchJson(`${BASE_URL}/pairs/`, config)
        },
    },
    Mutation: {
        createStat: (_, args) =>
            //obtener partidas anteriores
            fetchJson(`${BASE_URL}/pairs/${args.player}/`, config).then(r => {
                let partidas = [];
                partidas = JSON.parse(r.value);
                config.method = "PUT";
                const newPartida = {player: args.player, gameScore: args.gameScore}
                partidas.push(newPartida);
                config.body = JSON.stringify(partidas);
                fetchJson(`${BASE_URL}/pairs/${args.player}`, config);
                return JSON.stringify(newPartida);
            })


    },
    Stat: {
        estado: stat => stat.estado,
        gameScore: stat => stat.gameScore
    }
}


const server = new GraphQLServer({typeDefs, resolvers});

server.start({
    playground: "/",
    port: 3000
});



