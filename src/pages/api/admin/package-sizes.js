// src/pages/api/admin/package-sizes.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const packageId = parseInt(req.query.packageId);
      const packageSizes = await prisma.packageSize.findMany({
        where: { packageId: packageId },
      });

      return res.status(200).json(packageSizes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Ошибка при получении размеров пакета' });
    }
  } else {
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
