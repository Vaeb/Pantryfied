import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';

process.on('unhandledRejection', (reason, p) => {
    // When we forget to catch a promise which errors, it'll be auto-caught here
    console.log('Unhandled Promise Rejection at:', p);
    console.log('Reason:', reason);
});

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); // Our GraphQL schema
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'))); // Our GraphQL resolvers

const app = express();
app.use(cors('*'));

// const graphqlEndpoint = '/graphql';
const graphqlPort = 8080;
const resetDatabase = false; // DANGEROUS

const server = new ApolloServer({ typeDefs, resolvers, context: { models } }); // The http server system
server.applyMiddleware({ app }); // Link it to our express app

app.listen({ port: graphqlPort }, () => console.log(`GraphQL server ready at http://localhost:${graphqlPort}${server.graphqlPath}`)); // Setup the http port to listen to

models.sequelize.sync({ force: resetDatabase }).catch(console.error);
