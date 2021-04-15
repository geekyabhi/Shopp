const express=require('express')
const morgan =require('morgan')
require('colors')
require('dotenv').config()

const connectDB =require('./db/mongoose')
const productRoutes=require('./routes/productRoutes')
const {errorHandler,notFound}=require('./middleware/errorMiddleware')

const app=express()
connectDB()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}
app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT || 5000

app.use('/api/products',productRoutes)

app.listen(PORT,()=>{console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold)})