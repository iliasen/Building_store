const Router = require('express')
const router = new Router()
const itemsController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), itemsController.create)
router.get('/', itemsController.getAll)
router.get('/:id', itemsController.getOne)

module.exports = router