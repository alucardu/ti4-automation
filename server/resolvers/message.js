import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const messageResolvers = {
  Mutation: {
    createMessage: async (_, args) => {
      return await prisma.message.create({
        data: {
          message: args.message,
          user: {
            connect: {
              id: Number(args.userId)
            }
          },
          session: {
            connect: {
              id: Number(args.sessionId)
            }
          }
        }
      })
    },
  },
};
