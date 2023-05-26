const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/',authMiddleware, OrderController.createOrder)
router.get('/',checkRole('ADMIN'), OrderController.getOrder)
router.delete('/:id',authMiddleware, OrderController.completeOrder)

module.exports = router