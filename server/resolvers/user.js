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
        console.log(e)
        throw new Error (e)
      }
    },

    createUser: async (_, args) => {
      if (args.sessionId)  {
        const session = await prisma.session.findUnique({
          where: {
            id: +args.sessionId
          },
          include: {
            players: true
          }
        })

        const nameIsDuplicate = session.players.some((player) => player.name === args.name)

        if (nameIsDuplicate) {
          throw new Error(`Username ${args.name} already exists`)
        }

      }

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
