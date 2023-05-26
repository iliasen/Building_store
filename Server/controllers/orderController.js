const {Basket,OrderItem, Order, User, Item} = require('../models/models')
const ApiError = require('../error/ApiError')
class OrderController{
    async createOrder(req, res, next) {
        try {
            const { userId, address, comment } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден"));
            }
            const basket = await Basket.findOne({ where: { userId } });
            if (!basket) {
                return next(ApiError.badRequest("Корзина не найдена"));
            }
            const basketItems = await basket.getItems();
            if (basketItems.length === 0) {
                return res.status(400).json({ message: "Корзина пуста" });
            }
            const order = await Order.create({
                userId: user.id, // использовать userId вместо basketId
                username: user.email,
                address,
                comment,
            });
            // для каждого товара в корзине
            for (let basketItem of basketItems) {
                const itemId = basketItem.id;
                const quantity = basketItem.quantity;

                // создать новый OrderItem с этой информацией
                const orderItem = await OrderItem.create({
                    orderId: order.id,
                    itemId: itemId,
                    quantity: quantity,
                });

                await order.addOrderItem(orderItem);
            }
            console.log(basket)
            // очистить корзину
            await basket.setItems(null);

            return res.status(200).json(order);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async getOrder(req, res, next) {
        try {
            const orders = await Order.findAll({
                include: [
                    {
                        model: User,
                        as: "user",
                    },
                    {
                        model: Item,
                        as: "items",
                        through: { attributes: ["quantity"] },
                    },
                ],
            });

            if (orders.length === 0) {
                return next(ApiError.badRequest("Заказ не найден"));
            }

            const ordersWithItems = orders.map((order) => ({
                id: order.id,
                username: order.user.email, // использовать email из модели User
                address: order.address,
                comment: order.comment,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                items: order.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.order_item.quantity, // использовать quantity из модели OrderItem
                    // img: item.img,
                    // about: item.about,
                    // typeId: item.typeId,
                    // brandId: item.brandId,
                })),
            }));

            return res.status(200).json(ordersWithItems);
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    }

    async completeOrder(req, res,next){
        try {
            const {id} = req.params;
            const order = await Order.findByPk(id);
            if (!order) {
                return next(ApiError.badRequest("Заказ не найден" ));
            }
            await order.destroy();
            return next(ApiError.OK("Заказ успешно завершён" ));
        } catch (error) {
            return next(ApiError.internal(error.message));
        }
    };

}
module.exports = new OrderController()