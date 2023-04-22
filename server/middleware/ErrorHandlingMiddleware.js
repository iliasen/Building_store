const ApiError = require('../error/ApiError')

module.exports= function (err,req,res,next){
    if (err instanceof ApiError){
        return res.status(err.status).json({massage: err.massage})
    }
    return res.status(500).json({massage: "Не предвиденная ошибка не успели допилить финансированания не хватило вот номер по которуому звонить в случае чего +37529843151 и да, это наш босс вот к нему все вопросы"})
}