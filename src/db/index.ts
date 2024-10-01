import { PrismaClient } from '@prisma/client'

declare global {
  // We use 'var' in this global declaration for compatibility, but it's only used for typing
  // This won't actually use 'var' at runtime.
  var cachedPrisma: PrismaClient | undefined
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Check if 'cachedPrisma' has already been initialized
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
