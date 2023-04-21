const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const {Item, ItemInfo} = require('../models/models')
const fs = require('fs')//удаление страрого изображения
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

    async del(req,res,next) {
        let {id} = req.params
        if (!id) {
            return next(ApiError.internal("Ошибка. Не задан id"))
        }
        const item = await Item.destroy({where: {id}})
        res.json({massage: "товар успешно удалён"})

    }

    async update(req, res, next) {
        try {
            let {id, name, price, brandId, typeId, info} = req.body
            const item = await Item.findByPk(id)
            if (!item) {
                return next(ApiError.internal("Ошибка. Товар с таким id не найден"))
            }
            if (req.files) {
                const {img} = req.files
                let fileName = uuid.v4() + ".jpg"
                let oldFile = path.resolve(__dirname, '..', 'static', item.img)
                fs.unlink(oldFile, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
                await item.update({name, price, brandId, typeId, img: fileName})
            } else {
                await item.update({name, price, brandId, typeId})
            }

            if (info) {
                info = JSON.parse(info)
                await ItemInfo.destroy({where: {itemId: id}})
                info.forEach(i =>
                    ItemInfo.create({
                        title: i.title,
                        description: i.description,
                        itemId: id
                    })
                )
            }

            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}
module.exports = new ItemController();