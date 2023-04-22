const {Type} = require('../models/models')
const ApiError = require ('../error/ApiError')
//const {json} = require('express');

class TypeController{
    async create(req,res){
        const {name}=req.body
        const type = await Type.create({name})
        return res.json(type)
    }
    async getAll(req,res){
        const types = await Type.findAll()
        return res.json(types)
    }

    async del(req,res,next){
        const {id} = req.params // здесь вы получаете brandId из параметров URL
        if(!id){
            return next(ApiError.internal('Ошибка. Необходимо указать id типа товара'))
        }
        const type = await Type.destroy({where:{id}})
        res.json({message: 'тип товара успешно удалён'})
    }

    async update(req,res,next){
        const {name} = req.body
        const {id} = req.params
        if(!name || !id){
            return next(ApiError.internal('Ошибка. Необходимо указать id и новое имя типу товара'))
        }
        const type = await Type.update({name},{where:{id}})
        res.json({message: 'тип товара успешно обновлён'})
    }
}

module.exports = new TypeController()