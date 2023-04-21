const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/:basketId',checkRole('USER'),basketController.addItem)
router.get('/:basketId',checkRole('USER'),basketController.getItems)
router.put('/:basketId/:itemId',checkRole('USER'),basketController.updateItem)
router.delete('/:basketId/:itemId',checkRole('USER'),basketController.removeItem)

module.exports = router