import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Добавление пакетов
  const package1 = await prisma.package.create({
    data: {
      name: 'Packaging Bag',
      dimensions: '10x15x20 cm',
      quantityPerBox: 100,
      polyethylene: 'LDPE',
      thickness: '0.05 mm',
      size: 'Medium',
      color: 'Blue',
      sideFoldsSize: '2 cm',
      hasSideFolds: true,
      hasPrint: false,
      packing: 'Box',
      stockQuantity: 500,
      weight: 1.2,
      volume: 1.5,
      description: 'A high-quality packaging bag for various uses.',
      imageUrl: '/images/packaging_bag.jpg',
    },
  });

  // Добавление переводов для пакета
  await prisma.packageTranslation.createMany({
    data: [
      {
        packageId: package1.id,
        language: 'ru',
        name: 'Пакет для упаковки',
      },
      {
        packageId: package1.id,
        language: 'en',
        name: 'Packaging Bag',
      },
    ],
  });

  const package2 = await prisma.package.create({
    data: {
      name: 'Heavy Duty Bag',
      dimensions: '30x50x60 cm',
      quantityPerBox: 50,
      polyethylene: 'HDPE',
      thickness: '0.1 mm',
      size: 'Large',
      color: 'Red',
      sideFoldsSize: '5 cm',
      hasSideFolds: true,
      hasPrint: true,
      packing: 'Carton',
      stockQuantity: 300,
      weight: 2.5,
      volume: 3.0,
      description: 'A durable heavy-duty bag for industrial use.',
      imageUrl: '/images/heavy_duty_bag.jpg',
    },
  });

  await prisma.packageTranslation.createMany({
    data: [
      {
        packageId: package2.id,
        language: 'ru',
        name: 'Пакет повышенной прочности',
      },
      {
        packageId: package2.id,
        language: 'en',
        name: 'Heavy Duty Bag',
      },
    ],
  });

  console.log('Seed data added!');
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
