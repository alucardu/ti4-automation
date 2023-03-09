import { gql } from 'apollo-server-express'

// Construct a schema, using GraphQL schema language
export const userTypeDefs = gql`
  type User {
    id: ID
    name: String
  }

  type Mutation {
    createUser(name: String!, sessionId: ID): User
    deleteUser(id: ID): User
  }

  type Subscription {
    userCreated(id: ID, name: String): Session
    userDeleted(id: ID): User
  }
`
