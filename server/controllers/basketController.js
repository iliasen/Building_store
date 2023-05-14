const {Basket,BasketItem, Item} = require('../models/models')
const {ApiError}= require('../error/ApiError')

class BasketController{

    // async addItem(req, res, next) {
    //     try {
    //         const { basketId, itemId } = req.params;
    //         const { quantity } = req.body;
    //         const basket = await Basket.findOne({ where: { id: basketId } });
    //         if (!basket) {
    //             return next(ApiError.badRequest('Корзина не найдена'));
    //         }
    //         const item = await Item.findOne({ where: { id: itemId } });
    //         if (!item) {
    //             return next(ApiError.badRequest('Указанный товар не найдена'));
    //         }
    //         await basket.addItem(item, { through: { quantity } });
    //         return res.json({ message: 'Товар добавлен в карзину' });
    //     } catch (error) {
    //         return next(error);
    //     }
    // }
    //
    // async getItems(req, res, next) {
    //     const {id} = req.params;
    //     const basket = await Basket.findOne({ where: {id}});
    //     if (!basket) {
    //         return next(ApiError.badRequest('Корзина не найдена'));
    //     }
    //     const items = await basket.getItems();//выводим список товаров
    //     return res.json({ items });
    // }

    async addItem(req, res){
        try {
            const { basketId, itemId} = req.params
            const {quantity } = req.body

            // Найти или создать корзину с заданным идентификатором
            const [basket, created] = await Basket.findOrCreate({
                where: { id: basketId }
            })
            const item = await Item.findByPk(itemId)

            if (!item) {
                return res.status(404).json({ error: 'Item not found' })
            }

            await basket.addItem(item, { through: { quantity } })
            return res.status(200).json({ message: 'Item added to basket' })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getItems(req, res) {
        try {
            const { basketId } = req.params

            const basket = await Basket.findOne({where: { id: basketId },
                include: [{ model: BasketItem, as: 'basket_items', include: [{ model: Item, as: 'item' }] }]
            })

            if (!basket) {
                return res.status(404).json({ error: 'Basket not found' })
            }

            const itemsWithQuantity = basket.basket_items.map(item => ({
                id: item.itemId,
                name: item.item.name,
                price: item.item.price,
                quantity: item.quantity,
                img: item.item.img,
            }));

            return res.status(200).json({ basket_items: itemsWithQuantity })
        }catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }


    async removeItem(req, res) {
        try {
            const { basketId, itemId } = req.params
            const basketItem = await BasketItem.findOne({
                where: { basketId: basketId, itemId: itemId }
            })

            if (!basketItem) {
                return res.status(404).json({ error: 'Basket item not found' })
            }
            await basketItem.destroy()
            return res.status(200).json({ message: 'Basket item removed successfully' })
        }
        catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async updateItem(req, res) {
        try {
            const { basketId, itemId } = req.params
            const { quantity } = req.body

            const basketItem = await BasketItem.findOne({
                where: { basketId: basketId, itemId: itemId }
            })

            if (!basketItem) {
                return res.status(404).json({ error: 'Basket item not found' })
            }

            await basketItem.update({ quantity: quantity })

            return res.status(200).json({ message: 'Basket item updated successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}


module.exports = new BasketController();