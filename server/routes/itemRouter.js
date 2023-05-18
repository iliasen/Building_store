const Router = require('express')
const router = new Router()
const itemsController = require('../controllers/itemController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), itemsController.create)
router.delete('/:id',checkRole('ADMIN'), itemsController.del)
router.get('/', itemsController.getAll)
router.get('/:id', itemsController.getOne)
router.get('/all/get',checkRole('ADMIN'), itemsController.getAllForRemove)

module.exports = router