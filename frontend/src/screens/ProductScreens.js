import React from 'react'
import { Col, Row,Image,Card,Button,CardList, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import products from '../products'
import Ratings from '../components/Ratings'

const ProductScreens = ({match}) => {

    const product=products.find(p=>p._id===match.params.id)

    return (
        <>
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
        </>
    )
}

export default ProductScreens
