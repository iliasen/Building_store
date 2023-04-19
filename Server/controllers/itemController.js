const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Item, ItemInfo} = require('../models/models')

class ItemController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const item = await Item.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)//обратно возвращаем Json объект
                info.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        Id: item.id
                    })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    async getAll(req,res){
        let {brandId,typeId, limit, page}=req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let items;
        if(!brandId && !typeId){
            items = await Item.findAndCountAll({limit,offset})
        }
        if(brandId && !typeId){
            items = await Item.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            items = await Item.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            items = await Item.findAndCountAll({where:{brandId,typeId}, limit, offset})
        }
        return res.json(items)
    }
    async getOne(req, res) {//получение данных о товаре по id
        const {id} = req.params//праметр указывается в URl через /id(/1)
        const item = await Item.findOne(
            {
                where: {id},
                include: [{model: ItemInfo, as: 'info'}]
            },
        )
        return res.json(item)
    }
}
module.exports = new ItemController();