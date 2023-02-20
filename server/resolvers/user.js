import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      return await prisma.user.create({
        data: {
          name: args.name,
          session: {
            connect: { id: Number(args.sessionId) },
          }
        }
      })
    },
  },
};
