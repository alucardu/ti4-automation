import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const sessionResolvers = {
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
