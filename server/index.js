import { ApolloServer } from 'apollo-server-express';

import express from 'express'
import cors from 'cors';

import { sessionTypeDefs } from './typeDef/session.js'
import { sessionResolvers } from './resolvers/session.js'

const app = express()

let apolloServer = {
  graphqlPath: "/graphQL",
}

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs: [sessionTypeDefs],
    resolvers: [sessionResolvers]
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
