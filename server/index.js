import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express'
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Session {
    id: ID
  }

  type Query {
    sessions: [Session]
  }

  type Mutation {
    newSession: Session
  }

  type Mutation {
    removeSession(id: ID!): Session
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    sessions: async () => {
      return await prisma.session.findMany()
    },
  },

  Mutation: {
    newSession: async () => {
      return await prisma.session.create()
    },

    removeSession: async (_, args) => {
      return await prisma.session.delete({
        where: {
          id: Number(args.id)
        }
      });
    }
  },
};

let apolloServer = {
  graphqlPath: "/graphQL",
}


async function startServer() {
  const apolloServer = new ApolloServer({typeDefs, resolvers})
  await apolloServer.start();
  apolloServer.applyMiddleware({app, path: "/graphQL"})
}

startServer();

app.use(cors({
  origin: ['http://localhost:4200', 'https://studio.apollographql.com']
}));

app.listen(9000, () => {
  console.log("App listening in the port 9000")
  console.log(`gql path is ${apolloServer.graphqlPath}`)
})
