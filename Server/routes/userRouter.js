const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')

router.post('/registation', UserController.registation)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)
// router.delete('/',)// можно добавить

module.exports = router