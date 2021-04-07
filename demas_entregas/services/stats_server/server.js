const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const { v4: uuidv4 } = require('uuid');
const fetchJson = (...args) => fetch(...args).then(response => response.json());

const typeDefs = `
    type Query {
        pair(key:ID!):Pair,
        pairs: [Pair]
    }
    type Mutation {
        createStat(player:String!,gameScore:Int!) : Stat!
    }
    type Pair {  
        key:ID,
        applicationId:String,
        value: Stat
    }
    type Stat{            
         player:String,
         gameScore:Int
    }
`;

const BASE_URL = "https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development";
const config={method:"GET",headers:{"x-application-id":"abraham.fernandez"}}
const resolvers = {
    Query: {
        pair: (_, {key}) =>{ config.method="GET"; return fetchJson(`${BASE_URL}/pairs/${key}/`,config)},
        pairs: (_,) =>{ config.method="GET"; return fetchJson(`${BASE_URL}/pairs/`,config)},
    },
    Mutation: {
        createStat: (_, args) => {
            config.method="PUT"
            config.body=JSON.stringify({player:args.player,gameScore:args.gameScore})
            return fetchJson(`${BASE_URL}/pairs/`+uuidv4(),config)
        }
    },
    Stat:{
        player:stat=>JSON.parse(stat).player,
        gameScore:stat=>JSON.parse(stat).gameScore,
    }
}




const server = new GraphQLServer({ typeDefs, resolvers });

server.start({
    playground: "/",
    port: 3000
});



