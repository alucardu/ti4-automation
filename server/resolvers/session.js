import { PrismaClient } from '@prisma/client'
import cryptoRandomString from 'crypto-random-string';

const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const sessionResolvers = {
  Query: {
    getSession: async (_, args) => {
      return await prisma.session.findUnique({
        where: {
          code: args.code
        },
        include: {
          players: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      })
    },

    getSessions: async () => {
      return await prisma.session.findMany()
    },
  },

  Mutation: {
    createSession: async (_, args) => {
      const code = cryptoRandomString({length: 6, type: 'numeric'});
      return await prisma.session.create({
        data: {
          name: args.name,
          code: code
        }
      })
    },

    deleteSession: async (_, args) => {
      return await prisma.session.delete({
        where: {
          id: Number(args.id)
        }
      });
    }
  },
};
