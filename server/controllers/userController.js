const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket, Brand} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req,res,next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Неверный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,role,password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req,res,next){
        const {email, password}=req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal("Пользователь с таким именем не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)//расхешируем наш пароль и проверям есть ли пользователь в БД
        if(!comparePassword){
            return next(ApiError.internal("Не верный пароль"))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async changePassword(req, res, next) {
        const { email, oldPassword, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal("Пользователь не найден"));
        }
        const comparePassword = bcrypt.compareSync(oldPassword, user.password);
        if (!comparePassword) {
            return next(ApiError.internal("Не верный пароль"));
        }
        const hashPassword = await bcrypt.hash(newPassword, 5);
        await User.update({ password: hashPassword }, { where: { email } });
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
    }

    async del_account(req,res,next){
        const {id} = req.params
        if(!id){
            return next(ApiError.internal('Ошибка. Необходимо указать id пользователя'))
        }
        await User.destroy({where:{id}})
        res.json({message: 'Пользователь успешно удалён'})
    }

    async getOne(req, res, next){
        const {id} = req.params
        if(!id){
            return next(ApiError.internal('Ошибка. Необходимо указать id пользователя'))
        }
        const data = await User.findOne({where: {id}})
        console.log(data)
        res.json(data)
    }
}

module.exports = new UserController()