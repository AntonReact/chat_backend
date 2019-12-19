require("amd-loader");
const app = require('express')();
const socket = require('socket.io');
const { ApolloServer } = require('apollo-server-express')
const socketRoot = require('./socket/socket');
const typeDefs = require('./graphql/schema');
const { getUsers, createUser, updateUser, handleLogin } = require('./mongo');

const PORT = process.env.PORT || 3000;

interface GraphqlResolvers {
  Query: {
    users: any,
    user: any,
    login: any
  }
  Mutation: {
    updateUser: Object
    createUser: Object
  }
}

interface ApolloConfig {
  typeDefs: any
  resolvers: GraphqlResolvers
  introspection: Boolean
  playground: Boolean
}

const resolvers: GraphqlResolvers = {
  Query: {
    users: () => getUsers(),
    user: (_e: any, { name }) => getUsers(name),
    login: (_e: any, { input }) => handleLogin(input)
  },
  Mutation: {
    updateUser: (_e: any, { input }) => updateUser(input),
    createUser: (_e: any, { input }) => createUser(input)
  }
}

const apolloConfig: ApolloConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
}

app.get('/', (_req, res):void => res.end('Working!'))

const server:any = new ApolloServer(apolloConfig);
server.applyMiddleware({ app });

const http:any = app.listen(PORT, ():void => console.log(`App listening on port ${PORT}`));

// socket
const io:any = socket(http);
socketRoot(io);