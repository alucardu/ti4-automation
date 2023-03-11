import { PrismaClient } from '@prisma/client'
import { PubSub, withFilter } from 'graphql-subscriptions'
import cryptoRandomString from 'crypto-random-string'

const pubsub = new PubSub()
const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const sessionResolvers = {
  Query: {
    getSession: async (_, args) => {
      return await prisma.session.findUnique({
        where: {
          code: args.code,
        },
        include: {
          host: true,
          players: {
            orderBy: {
              id: 'asc',
            },
          },
        },
      })
    },
  },

  Mutation: {
    createSession: async (_, args) => {
      const code = cryptoRandomString({ length: 6, type: 'numeric' })
      const session = await prisma.session.create({
        data: {
          name: args.name,
          code: code,
        },
        include: {
          host: true,
          players: true,
        },
      })

      pubsub.publish('SESSION_CREATED', { sessionCreated: session })

      return session
    },

    connectUserToSession: async (_, args) => {
      const userIsHost = args.userType === 'host'
      const user = await prisma.user.findUnique({
        where: {
          id: Number(args.userId),
        },
      })

      try {
        const session = await prisma.session.update({
          where: {
            id: Number(args.sessionId),
          },
          data: {
            host: userIsHost
              ? {
                  connect: {
                    id: Number(args.userId),
                  },
                }
              : undefined,
            players: {
              connect: {
                id: Number(args.userId),
              },
            },
          },
          include: {
            players: true,
            host: true,
          },
        })

        pubsub.publish('USER_JOINED_SESSION', {
          userJoinedSession: {
            session: session,
            user: user,
          },
        })
        return session
      } catch(e) {
        console.log(e)
        throw new Error(e)
      }
    },

    deleteSession: async (_, args) => {
      const session = await prisma.session.delete({
        where: {
          id: Number(args.id),
        },
      })

      const sessions = await prisma.session.findMany()

      pubsub.publish('SESSION_DELETED', { sessionDeleted: { session, sessions } })

      return { session, sessions }
    },
  },

  Subscription: {
    sessionDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('SESSION_DELETED'),
        (payload, session) => {
          return payload.sessionDeleted.session.id === +session.id
        }
      ),
    },

    sessionCreated: {
      subscribe: () => {
        return pubsub.asyncIterator(['SESSION_CREATED'])
      },
    },

    userJoinedSession: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('USER_JOINED_SESSION'),
        (payload, session) => {
          return payload.userJoinedSession.session.id === +session.id
        }
      ),
    },
  },
}
