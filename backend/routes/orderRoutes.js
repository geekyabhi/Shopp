const router=require('express').Router()
const {addOrderItems}=require('../controllers/orderController')
const {protect}=require('../middleware/authMiddleware')

router.route('/').post(protect,addOrderItems)

module.exports=router