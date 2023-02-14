import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express'
import cors from 'cors';

const app = express()

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
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
  origin: 'http://localhost:4200'
}));

app.listen(9000, () => {
  console.log("App listening in the port 9000")
  console.log(`gql path is ${apolloServer.graphqlPath}`)
})
