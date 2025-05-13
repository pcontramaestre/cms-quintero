import { PrismaClient } from '@/generated/prisma'

// Crear una instancia global de PrismaClient para evitar múltiples instancias en desarrollo
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const db = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
