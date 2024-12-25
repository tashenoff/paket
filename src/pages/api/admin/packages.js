import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        name,
        dimensions,
        quantityPerBox,
        polyethylene,
        thickness,
        color,
        sideFoldsSize,
        hasSideFolds,
        hasPrint,
        packing,
        stockQuantity,
        weight,
        price,
        volume,
        description,
        imageUrl,
        size,  // Размер для пакета
      } = req.body;

      // Проверка на наличие обязательных данных
      if (!name || price === undefined || price === null || !dimensions || !size || !polyethylene || !thickness) {
        return res.status(400).json({ error: 'Название, цена, размер, габариты, полиэтилен и толщина обязательны' });
      }

      const parsedQuantityPerBox = quantityPerBox ? parseInt(quantityPerBox) : null;
      const parsedPrice = parseFloat(price);
      const parsedStockQuantity = stockQuantity ? parseInt(stockQuantity) : null;
      const parsedWeight = weight ? parseFloat(weight) : null;
      const parsedVolume = volume ? parseFloat(volume) : null;

      // Создание нового пакета
      const newPackage = await prisma.package.create({
        data: {
          name,
          dimensions,
          quantityPerBox: parsedQuantityPerBox,
          polyethylene,
          thickness,  // Добавлено обязательное поле thickness
          color,
          sideFoldsSize,
          hasSideFolds,
          hasPrint,
          packing,
          stockQuantity: parsedStockQuantity,
          weight: parsedWeight,
          price: parsedPrice,
          volume: parsedVolume,
          description,
          imageUrl,
          size, // Передаем размер
        },
      });

      // Создание связи для выбранного размера
      const selectedSize = await prisma.packageSize.create({
        data: {
          packageId: newPackage.id,
          size,
          stockQuantity: parsedStockQuantity,
          price: parsedPrice,
        },
      });

      return res.status(201).json({ newPackage, selectedSize });
    } catch (error) {
      console.error('Error details:', error.message);
      res.status(500).json({ error: 'Ошибка при добавлении товара' });
    }
  } else {
    res.status(405).json({ error: 'Метод не поддерживается' });
  }
}
