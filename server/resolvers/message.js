import { PrismaClient } from '@prisma/client'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()
const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const messageResolvers = {
  Query: {
    getMessages: async (_, args) => {
      return await prisma.message.findMany({
        where: {
          sessionId: +args.sessionId,
        },
        include: {
          user: true,
        },
      })
    },
  },

  Mutation: {
    createMessage: async (_, args) => {
      const session = await prisma.session.findUnique({
        where: {
          id: Number(args.sessionId),
        },
      })

      const message = await prisma.message.create({
        data: {
          message: args.message,
          user: {
            connect: {
              id: Number(args.userId),
            },
          },
          session: {
            connect: {
              id: Number(args.sessionId),
            },
          },
        },
        include: {
          user: true,
        },
      })

      pubsub.publish('USER_SEND_MESSAGE', {
        userSendMessage: {
          session: session,
          message: message,
        },
      })

      return message
    },
  },

  Subscription: {
    userSendMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('USER_SEND_MESSAGE'),
        (payload, session) => {
          return payload.userSendMessage.session.id === +session.id
        }
      ),
    },
  },
}
