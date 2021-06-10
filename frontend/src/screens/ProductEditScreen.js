import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

const ProductEditScreen = ({ location, history,match }) => {

    const productId=match.params.id

    const [name, setname] = useState('')
    const [price, setprice] = useState(0)
    const [image, setimage] = useState('')
    const [brand, setbrand] = useState('')
    const [category, setcategory] = useState('')
    const [countInStock, setcountInStock] = useState('')
    const [description, setdescription] = useState('')
    const [uploading, setuploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
    
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate
    
    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name||product._id!==productId){
                dispatch(listProductDetails(productId))
            }else{
                setname(product.name)
                setprice(product.price)
                setimage(product.image)
                setbrand(product.brand)
                setcategory(product.category)
                setcountInStock(product.countInStock)
                setdescription(product.description)
            }
        }
    }, [product,dispatch,productId,history,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
        let imageData = new FormData()
        imageData.append("file", file)
        imageData.append('upload_preset', 'Your unsigned upload preset');
 
        try{
            let res = await axios.post("https://api.cloudinary.com/v1_1/abhistrike/image/upload",imageData,{
                    onUploadProgress: function (progressEvent) {
                        var progress = Math.round((progressEvent.loaded * 100.0) / progressEvent.total);
                        setuploading(true)
                        console.log(progress)
                    },
                }
            )
            if (res.status === 200 &&(res.data.format === "jpg" || res.data.format === "png" ||res.data.format === "jpeg")){
                setimage(res.data.url)
                setuploading(false)
            }else{

            }
        }catch(err){
            console.log(err)
            setuploading(false)
        }
    }

    return (
        <>
            <Link className="btn btn-light my-3" to="/admin/userlist">
                {" "}
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate&&<Loader></Loader>}
                {errorUpdate&&<Message variant="danger">{errorUpdate}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    ></Form.Control>
                    <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}>
                        {uploading&&<Loader></Loader>}
                    </Form.File>
                </Form.Group>

                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setbrand(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="countInStock">
                    <Form.Label>Count In Stock</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="Enter countInStock"
                    value={countInStock}
                    onChange={(e) => setcountInStock(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="category">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
                </Form>
            </FormContainer>
        </>
    );
}

export default ProductEditScreen