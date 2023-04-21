const {Rating} = require('../models/models')
const ApiError = require('../error/ApiError')
const jwt = require("jsonwebtoken");
class RatingController {
    async create(req,res){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const userId = decoded.id
        const {rate} = req.body
        const {itemId} = req.params // itemId из параметров URL
        const rating = await Rating.findOne({where: {userId, itemId}})
        if (rating) {
            await rating.update({rate})
            return res.json(rating)
        } else {// если рейтинга нет
            const rating = await Rating.create({userId, itemId, rate})
            return res.json(rating)
        }
    }
    async getAll(req,res){
        const rating = await Rating.findAll()
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
        const {itemId} = req.params // здесь вы получаете id товара из URL
        const ratings = await Rating.findAll({where: {itemId}}) // здесь вы находите все рейтинги по этому id
        if (!ratings || ratings.length === 0) {
            return next(ApiError.internal("Ошибка. Рейтинги по этому товару не найдены"))
        }
        let sum = 0
        ratings.forEach(r => {
            sum += r.rate // здесь вы суммируете все рейтинги
        })
        let average = sum / ratings.length // здесь вы находите среднее арифметическое
        res.json({average: average}) // здесь вы отправляете ответ с общим рейтингом
    }

}
module.exports = new RatingController()