const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
class RatingController {
    async create(req,res){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decoded.id
        const {rate, feedback} = req.body
        const {itemId} = req.params // itemId из параметров URL
        const rating = await Rating.findOne({where: {userId, itemId}})
        if (rating) {
            await rating.update({rate, feedback})
            return res.json(rating)
        } else {// если рейтинга нет
            const rating = await Rating.create({userId, itemId, rate, feedback})
            return res.json(rating)
        }
    }
    async getAll(req,res,next){
        const {itemId} = req.params
        const rating = await Rating.findAll({where: {itemId}})
        if (!rating) {
            return next(ApiError.internal("Ошибка. Рейтинг от этого пользователя по этому товару не найден"))
        }
        return res.json(rating)
    }
    async del(req,res,next){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decoded.id
        const {itemId} = req.body
        const rating = await Rating.findOne({where: {userId, itemId}})
        if (!rating) {
            return next(ApiError.internal("Ошибка. Рейтинг от этого пользователя по этому товару не найден"))
        }
        await rating.destroy()
        res.json({message: "Рейтинг успешно удален"})
    }

    async getAverage(req,res,next){
        const {itemId} = req.params // id товара из URL
        if (!itemId) {
            return next(ApiError.internal("Ошибка. Не задан id товара"))
        }
        const ratings = await Rating.findAll({where: {itemId}}) // находим все рейтинги по этому id
        if (!ratings || ratings.length === 0) {
            return next(ApiError.internal("Ошибка. Рейтинги по этому товару не найдены"))
        }
        let sum = 0
        ratings.forEach(r => {
            sum += r.rate //суммируем все рейтинги
        })
        let average = sum / ratings.length // среднее арифметическое
        res.json(average)
    }
}
module.exports = new RatingController()