const {Basket} = require('../models/models')
const {ApiError}= require('../error/ApiError')
class BasketController{

    async addItem(req, res) {
        const { basketId, itemId, quantity } = req.body;
        const basket = await Basket.findOne({ where: { id: basketId } });
        if (!basket) {
            return res.status(404).json({ message: ‘Basket not found’ });
        }
        const item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
            return res.status(404).json({ message: ‘Item not found’ });
        }
        await basket.addItem(item, { through: { quantity } });
        return res.json({ message: ‘Item added to basket’ });
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


    async removeItem(req, res) {
        const { basketId, itemId } = req.body;
        const basket = await Basket.findOne({ where: { id: basketId } });
        if (!basket) {
            return res.status(404).json({ message: ‘Basket not found’ });
        }
        const item = await Item.findOne({ where: { id: itemId } });
        if (!item) {
            return res.status(404).json({ message: ‘Item not found’ });
        }
        await basket.removeItem(item);
        return res.json({ message: ‘Item removed from basket’ });
    }
}


module.exports = new BasketController();