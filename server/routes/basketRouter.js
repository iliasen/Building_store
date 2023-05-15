const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')//проверка пользователя на авторизованность

router.post('/:userId/:itemId',authMiddleware,basketController.addItem)
router.get('/:userId',authMiddleware,basketController.getItems)
router.put('/:userId/:itemId',authMiddleware,basketController.updateItem)
router.delete('/:userId/:itemId',basketController.removeItem)

module.exports = router