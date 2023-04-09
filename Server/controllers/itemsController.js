const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {items} = require('../models/models')

class ItemsController{
    async create(req,res, next){
        try{
            const {name,price, brandID,typeID,info}=req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"// инерирование имени изоброжения
            img.mv(path.resolve(__dirname,'..','static',fileName))//dirname - путь до текущей папрки, ('..') - вернутся на дерикторию назад, 3 - й параметр папка назначения в нашем случае static
            const item = await items.create({name,price,brandID,typeID, img:fileName})
            return res.json(item)
        }catch (e) {
            next(ApiError.badRequest(e.massage))
        }
    }
    async getAll(req,res){}
    async getOne(req,res){}//получение данных о товаре по id
}
module.exports = new ItemsController();