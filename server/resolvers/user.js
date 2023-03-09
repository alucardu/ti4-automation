  import { PrismaClient } from '@prisma/client'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()
const prisma = new PrismaClient()

// Provide resolver functions for your schema fields
export const userResolvers = {
  Mutation: {
    deleteUser: async (ctx, args) => {
      try {
        const user = await prisma.user.delete({
          where: {
            id: +args?.id || +ctx?.id
          }
        })

        pubsub.publish('USER_DELETED_SUBSCRIPTION', { userDeleted: user })

        return user
      } catch(e) {
        console.log('user record not found')
      }
    },

    createUser: async (_, args) => {
      const user = prisma.user.create({
        data: {
          name: args.name,
        },
      })

      pubsub.publish('USER_CREATED_SUBSCRIPTION', { userCreated: user })

      return user
    },
  },

  Subscription: {
    userCreated: {
      subscribe: () => {
        return pubsub.asyncIterator(['USER_CREATED_SUBSCRIPTION'])
      },
    },

    userDeleted: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['USER_DELETED_SUBSCRIPTION']),
        (payload, session) => payload.userDeleted.sessionId === +session.id
      )
    }
  },
}
