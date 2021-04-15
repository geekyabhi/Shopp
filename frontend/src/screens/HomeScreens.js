import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { listProducts }  from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
// import products from '../products'
const HomeScreens = () => {

    const dispatch = useDispatch()

    const productList =useSelector(state=>state.productList)

    const {loading,error,products}=productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return loading ?(
        <>
            <h1>Latest Products</h1>
            <Loader></Loader>
        </>
        )
        : 
        error ?(
            <Message variant="danger">{error}</Message> 
        ):
        (
            <h3>  
                <Row>
                    {products.map(product=>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product}></Product>
                        </Col>
                    ))}
                </Row> 
            </h3>
        )
}

export default HomeScreens
