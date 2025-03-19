// index.ts
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import connectDB from './db.js';
import mongoose from 'mongoose';

// Define the Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
async function startServer() {
  // Connect to the database
  await connectDB();
  mongoose.set('debug', true);

  // Start the Apollo Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});