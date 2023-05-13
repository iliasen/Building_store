const Router = require('express')
const router = new Router()
const ratingController = require("../controllers/ratingController")
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/:itemId',checkRole('USER'), ratingController.create)
router.delete('/:itemId',checkRole('USER'), ratingController.del)
router.get('/average/:itemId', ratingController.getAverage)
router.get('/:itemId', ratingController.getAll)

module.exports = router