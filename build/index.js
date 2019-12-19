"use strict";
require("amd-loader");
const app = require('express')();
const socket = require('socket.io');
const { ApolloServer } = require('apollo-server-express');
const socketRoot = require('./socket/socket');
const typeDefs = require('./graphql/schema');
const { getUsers, createUser, updateUser, handleLogin } = require('./mongo');
const PORT = process.env.PORT || 3000;
const resolvers = {
    Query: {
        users: () => getUsers(),
        user: (_e, { name }) => getUsers(name),
        login: (_e, { input }) => handleLogin(input)
    },
    Mutation: {
        updateUser: (_e, { input }) => updateUser(input),
        createUser: (_e, { input }) => createUser(input)
    }
};
const apolloConfig = {
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
};
app.get('/', (_req, res) => res.end('Working!'));
const server = new ApolloServer(apolloConfig);
server.applyMiddleware({ app });
const http = app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
const io = socket(http);
socketRoot(io);
