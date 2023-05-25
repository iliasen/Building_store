const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const itemRouter = require('./itemRouter')
const ratingRouter = require('./ratingRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/item', itemRouter)
router.use('/brand', brandRouter)
router.use('/rating', ratingRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)

module.exports = router