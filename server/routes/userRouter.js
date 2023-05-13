const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')//проверка пользователя на авторизованность

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth',authMiddleware, UserController.check)
router.get('/:id',UserController.getOne)
router.put('/change',authMiddleware, UserController.changePassword)
router.delete('/delete_account/:id',authMiddleware, UserController.del_account)

module.exports = router