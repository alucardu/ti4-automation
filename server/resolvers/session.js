import { PrismaClient } from '@prisma/client'
import cryptoRandomString from 'crypto-random-string';

const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const sessionResolvers = {
  Query: {
    sessions: async () => {
      return await prisma.session.findMany()
    },
  },

  Mutation: {
    newSession: async (_, args) => {
      const code = cryptoRandomString({length: 6, type: 'numeric'});
      return await prisma.session.create({
        data: {
          name: args.name,
          code: code
        }
      })
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
