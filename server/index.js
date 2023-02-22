import { ApolloServer } from 'apollo-server-express';

import express from 'express'
import cors from 'cors';

import { sessionTypeDefs } from './typeDef/session.js'
import { sessionResolvers } from './resolvers/session.js'

import { userTypeDefs } from './typeDef/user.js'
import { userResolvers } from './resolvers/user.js';

import { messageTypeDefs } from './typeDef/message.js'
import { messageResolvers } from './resolvers/message.js'

const app = express()

let apolloServer = {
  graphqlPath: "/graphQL",
}

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs: [sessionTypeDefs, userTypeDefs, messageTypeDefs],
    resolvers: [sessionResolvers, userResolvers, messageResolvers]
  })
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
