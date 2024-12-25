import prisma from '../../../lib/prisma'; // Убедитесь, что путь правильный

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        fullName,
        phone,
        email,
        additionalPhone,
        comment,
        totalPrice,
        orderItems,
        deliveryMethodId,
      } = req.body;

      // Логируем полученные данные для отладки
      console.log('Полученные данные на сервере:', req.body);

      // Проверяем, что все обязательные данные присутствуют
      if (
        !fullName ||
        !phone ||
        !email ||
        !orderItems ||
        orderItems.length === 0 ||
        !deliveryMethodId
      ) {
        return res.status(400).json({ error: 'Пожалуйста, предоставьте все обязательные данные.' });
      }

      // Пытаемся создать заказ
      const order = await prisma.order.create({
        data: {
          fullName,
          phone,
          email,
          additionalPhone,
          comment,
          totalPrice,
          deliveryMethodId: Number(deliveryMethodId),
          orderItems: {
            create: orderItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
              packageSize: item.packageSize
                ? {
                    connect: {
                      packageId_size: {
                        packageId: item.packageSize.packageId,
                        size: item.packageSize.size,
                      },
                    },
                  }
                : undefined,
            })),
          },
        },
      });
      

      // Логируем результат создания заказа
      console.log('Заказ успешно создан:', order);

      if (!order) {
        return res.status(500).json({ error: 'Не удалось создать заказ. Объект пустой.' });
      }

      // Отправляем данные обратно
      res.status(200).json(order);
    } catch (error) {
      console.error('Ошибка при создании заказа:', error.message || error); // Убедимся, что выводим ошибку в понятном формате
      res.status(500).json({ error: 'Произошла ошибка на сервере.' });
    }
  } else {
    res.status(405).json({ error: 'Метод не разрешен' });
  }
}
