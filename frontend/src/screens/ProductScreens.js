import React, { useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listProductDetails }  from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Row,Image,Card,Button, ListGroup, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratings from '../components/Ratings'
const ProductScreens = ({history,match}) => {

    const [qty,setqty]=useState(1)



    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)

    const {product,error,loading}=productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match])

    const addToCartHandler=()=>{
        
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    // const product=products.find(p=>p._id===match.params.id)
    return loading?
    (
        <>
            <Link className="btn btn-light my-3" to="/">Go back</Link>
            <Loader></Loader>
        </>
    ): 
    error ?(
        <>
        <Link className="btn btn-light my-3" to="/">Go back</Link>
        <Message variant="danger">{error}</Message> 
        </>
    ):
    (
        <div>
            <Link className="btn btn-light my-3" to="/">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Ratings value={product.rating} text={`${product.numReviews} reviews`}></Ratings>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Prize : {product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description : {product.description}
                    </ListGroup.Item>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                        
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock>0?'In Stock':'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {product.countInStock>0&&(
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as="select" value={qty} onChange={e=>setqty(e.target.value)}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x=>(
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={product.countInStock===0}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                        
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreens
