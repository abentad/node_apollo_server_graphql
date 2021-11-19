const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs');
let db = require('./db');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');



const server = new ApolloServer({ 
    typeDefs: readFileSync('./src/schema.graphql').toString('utf-8'),
    resolvers: {
        Query,
        Mutation,
        User,
        Post,
        Comment
    },
    context: { db }
});

server.listen().then(({url})=> console.log(`server started at ${url}`));