const {Basket,BasketItem, Item} = require('../models/models')
const {ApiError}= require('../error/ApiError')

class BasketController{

        async addItem(req, res, next) {
        try {
            const {userId, itemId} = req.params
            const {quantity} = req.body

            // Найти или создать корзину с заданным идентификатором
            const [basket, created] = await Basket.findOrCreate({
                where: { id: userId }
            })
            if (!basket) {
                return next(ApiError.internal("Ошибка. не задан id пользователя"))
            }
            const item = await Item.findByPk(itemId)

            if (!item) {
                return next(ApiError.internal("Ошибка. Заданный товар не найден"))
            }

            // Найти запись в таблице связей между корзиной и товаром
            const basketItem = await BasketItem.findOne({
                where: { basketId: basket.id, itemId: item.id }
            })

            // Если запись существует, увеличить количество товара на заданное значение
            if (basketItem) {
                basketItem.quantity += Number(quantity)
                await basketItem.save()
            } else {
                // Иначе создать новую запись с заданным количеством
                await basket.addItem(item, { through: { quantity } })
            }

            return res.json({massage: "товар добавлен к корзину"})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        }

    async getItems(req, res, next) {
        try {
            const { userId } = req.params

            const basket = await Basket.findOne({where: { userId: userId },
                include: [{ model: BasketItem, as: 'basketItems', include: [{ model: Item, as: 'item' }] }], order: [['basketItems', 'id', 'ASC']]
            })

            if (!basket) {
                return next(ApiError.internal("Ошибка. Корзина с заданным id не найдена"))
            }

            const itemsWithQuantity = basket.basketItems.map(item => ({
                id: item.itemId,
                name: item.item.name,
                price: item.item.price,
                quantity: item.quantity,
                img: item.item.img,
                about: item.item.about,
                typeId: item.item.typeId,
                brandId: item.item.brandId
            }));
            return res.json({ basket_items: itemsWithQuantity })
        }catch (e) {
            console.log(e)
            next(ApiError.badRequest(e.message))
        }
    }


    async removeItem(req, res,next) {
        try {
            const { userId, itemId } = req.params
            const basketItem = await BasketItem.findOne({
                where: { basketId: userId, itemId: itemId }
            })

            if (!basketItem) {
                return next(ApiError.internal("Ошибка. Корзина с заданными параметрами не найдена"))
            }
            await basketItem.destroy()
            return res.json({ message: 'Тавар удалён' })
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateItem(req, res, next) {
        try {
            const { userId, itemId } = req.params
            const { quantity } = req.body

            const basketItem = await BasketItem.findOne({
                where: { basketId: userId, itemId: itemId }
            })

            if (!basketItem) {
                return next(ApiError.internal("Ошибка. Корзина с заданным id не найдена"))
            }

            await basketItem.update({ quantity: quantity })

            return res.json({ message: 'Изменено количество товара' })
        } catch (error) {
            return next(ApiError.forbidden(error.massage))
        }
    }
}


module.exports = new BasketController();