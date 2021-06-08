const router=require('express').Router()
const {addOrderItems,getOrderById,updateOrderToPaid, getMyOrders}=require('../controllers/orderController')
const {protect}=require('../middleware/authMiddleware')

router.route('/').post(protect,addOrderItems)
router.route('/myOrders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderById)
router.route('/:id/pay').put(protect,updateOrderToPaid)

module.exports=router