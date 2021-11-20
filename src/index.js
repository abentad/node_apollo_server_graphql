const { GraphQLServer, PubSub } = require('graphql-yoga');
let db = require('./db');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');
const Subscription = require('./resolvers/Subscription');

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: { Query, Mutation, Subscription, User, Post, Comment },
    context: { db, pubsub }
})

server.start(() => console.log('Server is running on http://localhost:4000'));