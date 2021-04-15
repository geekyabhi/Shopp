import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Row,Image,Card,Button, ListGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
// import products from '../products'
import Ratings from '../components/Ratings'

const ProductScreens = ({match}) => {

    const [product, setProduct] = useState([])
    const [loading, setloading] = useState(false)
    useEffect(() => {
        const fetchProducts=async ()=>{
            setloading(true)
            const {data}=await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
            setloading(false)
        }
        fetchProducts()
    }, [match])


    // const product=products.find(p=>p._id===match.params.id)
    return loading?
    (
        <>
            <Link className="btn btn-light my-3" to="/">Go back</Link>
            <Spinner></Spinner>
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

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock===0}>
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
