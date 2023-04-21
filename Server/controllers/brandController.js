const {Brand} = require('../models/models')
const ApiError = require ('../error/ApiError')

class BrandController{
    async create(req,res){
        const {name}=req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req,res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
     async del(req,res,next){
        const {id} = req.params // здесь вы получаете brandId из параметров URL
        if(!id){
            return next(ApiError.internal('Ошибка. Необходимо указать id бренда'))
        }
        const brand = await Brand.destroy({where:{id}})
        res.json({message: 'бренд успешно удалён'})
    }

    async update(req,res,next){
        const {name} = req.body
        const {id} = req.params // brandId из параметров URL
        if(!name || !id){
            return next(ApiError.internal('Ошибка. Необходимо указать id и новое имя бренда'))
        }
        const brand = await Brand.update({name},{where:{id}})
        res.json({message: 'бренд успешно обновлён'})
    }
}

module.exports = new BrandController()