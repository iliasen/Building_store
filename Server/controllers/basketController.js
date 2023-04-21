const {Basket, Item} = require('../models/models')
const {ApiError}= require('../error/ApiError')
class BasketController{

    async addItem(req, res, next) {
        const {basketId, itemId} = req.params;
        const {quantity} = req.body
        const basket = await Basket.findOne({ where: {id: basketId}});
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const item = await Item.findOne({ where: {id: itemId}});
        if (!item) {
            return next(ApiError.badRequest('Указанный товар не найдена'))
        }
        await basket.addItem(item, { through: { quantity } });
        return res.json({ message: "Товар добавлен в карзину" });
    }

    async getItems(req, res, next) {
        const {id} = req.params;
        const basket = await Basket.findOne({ where: {id}});
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'));
        }
        const items = await basket.getItems();//выводим список товаров
        return res.json({ items });
    }


    async removeItem(req, res, next) {
        const { basketId, itemId } = req.params;
        const basket = await Basket.findOne({ where: { id: basketId}});
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const item = await Item.findOne({ where: { id: itemId }});
        if (!item) {
            return next(ApiError.badRequest('Указанный товар не найдена'))
        }
        await basket.removeItem(item);
        return res.json({ message: "Товар удалён из карзину" });
    }

    async updateItem (req, res, next) {
        const {basketId, itemId} = req.params;
        const {quantity} = req.body
        const basket = await Basket.findOne({ where: {id: basketId}});
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const item = await Item.findOne({ where: {id: itemId}});
        if (!item) {
            return next(ApiError.badRequest('Указанный товар не найдена'))
        }
        await basket.setQuantity(item, quantity)
        return res.json({ message: "Количество товара изменено !"});
    }
}


module.exports = new BasketController();