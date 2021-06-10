import React, { useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listProductDetails,createProductReview, createProduct }  from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Row,Image,Card,Button, ListGroup, Form} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratings from '../components/Ratings'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
const ProductScreens = ({history,match}) => {

    const [qty,setqty]=useState(1)
    const [rating,setrating]=useState(0)
    const [comment,setcomment]=useState('')



    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo}=userLogin

    const productDetails = useSelector(state => state.productDetails)
    const {product,error,loading}=productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {error:errorProductReview,success:successProductReview}=productReviewCreate

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch,match,successProductReview])

    const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler=(e)=>{
        if(successProductReview){
            alert('Review Submitted')
            setrating(0)
            setcomment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        e.preventDefault()
        dispatch(createProductReview(match.params.id,{
            rating,
            comment
        }))
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
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.length===0&&<Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review=>{
                            return (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Ratings value={review.rating}/>
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            )   
                        })}
                        <ListGroup.Item> 
                            <h2>Write a Customer Review</h2>
                            {
                                errorProductReview&&(<Message variant="danger">{errorProductReview}</Message>)
                            }
                            {userInfo?(
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select" value={rating} onChange={(e)=>{setrating(e.target.value)}}>
                                            <option value="">Select...</option>
                                            <option value="1">1-Poor</option>
                                            <option value="2">2-Fair</option>
                                            <option value="3">3-Good</option>
                                            <option value="4">4-Very Good</option>
                                            <option value="5">5-Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" row='3' value={comment} onChange={(e)=>setcomment(e.target.value)}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">
                                        Submit
                                    </Button>
                                </Form>
                            ):<Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreens
