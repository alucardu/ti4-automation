import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const session = await prisma.session.create({})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
