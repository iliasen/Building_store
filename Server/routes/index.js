const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const itemsRouter = require('./itemsRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/item', itemsRouter)
router.use('/brand', brandRouter)

module.exports = router