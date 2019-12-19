export {};
const { gql } = require('apollo-server-express')

const typeDefs:any = gql`
  type Query {
    users: [User]
    user(name: String!): User
    login(input: UserInput!): Login
  }

  type Mutation {
    updateUser(input: UserInput!): User
    createUser(input: UserInput!): User
  }

  type User {
      id: String
      name: String
      password: String
  }

  type Login {
    isLogged: Boolean
  }

  input UserInput {
    id: Int
    name: String
    password: String
  }
`

module.exports = typeDefs;