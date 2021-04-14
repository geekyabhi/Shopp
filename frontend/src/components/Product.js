import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Ratings from './Ratings'

const Product = ({product}) => {
    return (
        <div>
            <Card className="my-3 p-3 rounded"> 
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top"></Card.Img>
                </Link> 
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as="div">
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link>
                    <div>
                        {/* <Card.Text> */}
                            <Ratings value={product.rating} text={`${product.numReviews} reviews`}>
                            </Ratings>
                        {/* </Card.Text> */}
                    </div>
                    <Card.Text as="h3">${product.price}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
