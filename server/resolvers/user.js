import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const userResolvers = {
  Mutation: {
    createUser: async (_, args) => {
      try {
        return await prisma.user.create({
          data: {
            name: args.name,
          }
        })
      } catch (err) {
        throw new Error(`Username ${args.name} already exists`);
      }
    },
  },
};
