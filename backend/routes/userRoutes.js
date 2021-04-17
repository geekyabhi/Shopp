const { authUser, getUserProfile, registerUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
const router=require('express').Router()

router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)
router.route('/').post(registerUser)

module.exports=router