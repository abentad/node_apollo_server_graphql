const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema/type_defs');
const { resolvers } = require('./schema/resolvers');





const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({url})=> console.log(`server started at ${url}`));