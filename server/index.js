import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';

import express from 'express';
import cors from 'cors';

import { sessionTypeDefs } from './typeDef/session.js';
import { sessionResolvers } from './resolvers/session.js';

import { userTypeDefs } from './typeDef/user.js';
import { userResolvers } from './resolvers/user.js';

import { messageTypeDefs } from './typeDef/message.js';
import { messageResolvers } from './resolvers/message.js';

const app = express();
const httpServer = createServer(app);
const PORT = 9000;

const schema = makeExecutableSchema({
  typeDefs: [sessionTypeDefs, userTypeDefs, messageTypeDefs],
  resolvers: [sessionResolvers, userResolvers, messageResolvers],
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

const serverCleanup = useServer(
  {
    schema,
    onConnect: async () => {
      console.log('User connected');
    },
    onDisconnect() {
      console.log('User disconnected');
    },
  },
  wsServer
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphQL' });

app.use(
  '/graphql',
  cors({
    origin: [
      'http://localhost:4200',
      'https://studio.apollographql.com',
      'ws://localhost:9000',
    ],
  }),
  bodyParser.json()
);

httpServer.listen(PORT, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`
  );
});
