const {Basket,BasketItem, Item} = require('../models/models')
const {ApiError}= require('../error/ApiError')

class BasketController{

        async addItem(req, res, next) {
        try {
            const { basketId, itemId} = req.params
            const {quantity } = req.body

            // Найти или создать корзину с заданным идентификатором
            const [basket, created] = await Basket.findOrCreate({
                where: { id: basketId }
            })
            const item = await Item.findByPk(itemId)

            if (!item) {
                return next(ApiError.internal("Ошибка. Заданный товар не найден"))
            }

            await basket.addItem(item, { through: { quantity } })
            return res.json({massage: "товар добавлен к корзину"})
        } catch (error) {
            return next(ApiError.forbidden(error.massage))
        }
    }

    async getItems(req, res, next) {
        try {
            const { basketId } = req.params

            const basket = await Basket.findOne({where: { id: basketId },
                include: [{ model: BasketItem, as: 'basket_items', include: [{ model: Item, as: 'item' }] }]
            })

            if (!basket) {
                return next(ApiError.internal("Ошибка. Корзина с заданным id не найдена"))
            }

            const itemsWithQuantity = basket.basket_items.map(item => ({
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
        }catch (error) {
            return next(ApiError.forbidden(error.massage))
        }
    }


    async removeItem(req, res,next) {
        try {
            const { basketId, itemId } = req.params
            const basketItem = await BasketItem.findOne({
                where: { basketId: basketId, itemId: itemId }
            })

            if (!basketItem) {
                return next(ApiError.internal("Ошибка. Корзина с заданным id не найдена"))
            }
            await basketItem.destroy()
            return res.json({ message: 'Тавар удалён' })
        }
        catch (error) {
            return next(ApiError.forbidden(error.massage))
        }
    }

    async updateItem(req, res, next) {
        try {
            const { basketId, itemId } = req.params
            const { quantity } = req.body

            const basketItem = await BasketItem.findOne({
                where: { basketId: basketId, itemId: itemId }
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