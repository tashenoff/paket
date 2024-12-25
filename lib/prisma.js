// lib/prisma.js
import { PrismaClient } from '@prisma/client';

let prisma;

// Проверяем, если мы находимся в окружении Node.js, чтобы не создавать несколько экземпляров клиента на разных запросах
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Используем глобальный объект для того, чтобы не создавать новый экземпляр Prisma при каждом запросе в режиме разработки
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
