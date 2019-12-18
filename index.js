const app = require('express')();
const socket = require('socket.io');
const { ApolloServer } = require('apollo-server-express')
const socketRoot = require('./socket/socket');
const typeDefs = require('./graphql/schema');
const { getUsers, createUser, updateUser, handleLogin } = require('./mongo');

const PORT = process.env.PORT || 3000;

const resolvers = {
  Query: {
    users: () => getUsers(),
    user: (a, { name }) => getUsers(name),
    login: (a, { input }) => handleLogin(input)
  },
  Mutation: {
    updateUser: (a, { input }) => updateUser(input),
    createUser: (a, { input }) => createUser(input)
  }
}
app.get('/', (req, res) => res.end('Working!'))

const server = new ApolloServer({ typeDefs, resolvers, introspection: true, playground: true });
server.applyMiddleware({ app });

const http = app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

// socket
const io = socket(http);
socketRoot(io);