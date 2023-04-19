const Router = require('express')
const router = new Router()
const itemsController = require('../controllers/itemController')

router.post('/', itemsController.create)
router.get('/', itemsController.getAll)
router.get('/:id', itemsController.getOne)

module.exports = router