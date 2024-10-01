import { PrismaClient } from '@prisma/client'

declare global {
  // Correctly declare the global variable
  // We use 'let' here since 'var' is not recommended
  var cachedPrisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Use 'let' and check if 'cachedPrisma' has already been initialized
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
