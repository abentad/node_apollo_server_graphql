const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { readFileSync } = require('fs');
//
let db = require('./db');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Comment = require('./resolvers/Comment');
const Subscription = require('./resolvers/Subscription');



async function startApolloServer(typeDefs, resolvers, context) {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({ typeDefs, resolvers, context, plugins: [ApolloServerPluginDrainHttpServer({ httpServer })] });
    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
      app,
      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/'
    });
    // Modified server startup
    // await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

  startApolloServer(
    readFileSync('./src/schema.graphql').toString('utf-8'),
    {
        Query,
        Mutation,
        User,
        Post,
        Comment,
        Subscription
    },
    { db }
  );