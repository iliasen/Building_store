const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/:basketId/:itemId',basketController.addItem)
router.get('/:basketId',basketController.getItems)
router.put('/:basketId/:itemId',basketController.updateItem)
router.delete('/:basketId/:itemId',basketController.removeItem)

module.exports = router