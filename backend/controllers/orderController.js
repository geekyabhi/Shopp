const Order =require('../models/orderModel')
const asyncHandler=require('express-async-handler')

const addOrderItems=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body
    console.log(req.body)
    if(orderItems&&orderItems.length===0){
        res.status(400)
        throw new Error('No order Items')
        return
    }else{
        const order=new Order({orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice,user:req.user._id})
        const createdOrder=await order.save()
        res.status(201).json(createdOrder)
    }
})

module.exports={addOrderItems}