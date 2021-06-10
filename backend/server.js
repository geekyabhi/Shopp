const express=require('express')
const morgan =require('morgan')
require('colors')
require('dotenv').config()
const path=require('path')
const connectDB =require('./db/mongoose')
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')
const uploadRoutes=require('./routes/uploadRoutes')
const {notFound,errorHandler}=require('./middleware/errorMiddleware')

const app=express()
connectDB()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(express.json())

const PORT=process.env.PORT || 5000

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)
app.get('/api/config/razorpay',(req,res)=>{res.send(process.env.RAZORPAY_KEY_ID)})

app.use(notFound)
app.use(errorHandler)
const usedpath=path.join(__dirname,'/uploads')
console.log(usedpath)
app.use('/upload',express.static(usedpath))

app.listen(PORT,()=>{console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold)})