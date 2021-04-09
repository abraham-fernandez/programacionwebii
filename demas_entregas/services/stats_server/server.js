const {GraphQLServer} = require("graphql-yoga");
const fetch = require("node-fetch");
const {v4: uuidv4} = require('uuid');
const fetchJson = (...args) => fetch(...args).then(response => response.json());

const typeDefs = `
    type Query {
        pair(key:ID!, status:String):Pair,
        pairs(status:String): [Stat]
    }
    type Mutation {
        createStat(player:String!,estado:String!,gameScore:Int!) : Stat!
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
`;

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const config = {method: "GET", headers: {"x-application-id": "abraham.fernandez.dev"}}
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
        pairs: (_,{status}) => {
            config.method = "GET";
            delete config.body;
            return fetchJson(`${BASE_URL}/pairs/`, config).then(res => (

            status ?  res.map(stat => JSON.parse(stat.value).filter((s)=>s.estado === status)).flat() :
                res.map(stat => JSON.parse(stat.value).map((s)=>s)).flat()
        ))
        },
    },
    Mutation: {
        createStat: (_, args) =>
            //obtener partidas anteriores
            fetchJson(`${BASE_URL}/pairs/${args.player}/`, config).then(r => {
                let partidas = [];
                if(r.value)
                     partidas = JSON.parse(r.value);
                config.method = "PUT";
                const newPartida = {player: args.player,estado:args.estado ,gameScore: args.gameScore}
                partidas.push(newPartida);

                config.body = JSON.stringify(partidas);

                fetchJson(`${BASE_URL}/pairs/${args.player}`, config);
                return newPartida;
            })


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
    port: 3000
});



