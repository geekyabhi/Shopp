import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'
import Spinner from '../components/Spinner'
// import products from '../products'
const HomeScreens = () => {

    const [products, setProducts] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const fetchProducts=async ()=>{
            setloading(true)
            const {data}=await axios.get('/api/products')
            setProducts(data)
            setloading(false)
        }
        fetchProducts()
    }, [])

    return loading ?(
        <>
            <h1>Latest Products</h1>
            <Spinner></Spinner>
        </>
        )
        : 
    (
        <>  
            <Row>
                {products.map(product=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product}></Product>
                    </Col>
                ))}
            </Row> 
        </>
    )
}

export default HomeScreens
