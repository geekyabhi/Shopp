const express=require('express')
const morgan =require('morgan')
require('colors')
require('dotenv').config()

const products=require('./data/products')
const connectDB =require('./db/mongoose')

const app=express()
connectDB()
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

const PORT=process.env.PORT || 5000


app.get('/',(req,res)=>{
    res.send('API is running')
})

app.get('/api/products',(req,res)=>{
    res.json(products)
})

app.get('/api/products/:id',(req,res)=>{
    const product=products.find(p=>p._id===req.params.id)
    res.json(product)
})

app.listen(PORT,()=>{console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold)})