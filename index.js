const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type_defs');
const { resolvers } = require('./schema/resolvers');


/*
array methods in js:
    arr.find((data)=> )
    arr.filter
    arr.findIndex
    arr.some
    arr.splice
*/




const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({url})=> console.log(`server started at ${url}`));