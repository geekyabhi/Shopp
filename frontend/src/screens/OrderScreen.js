import React, { useEffect,useState} from 'react'
import {Col,Row,Image,Card,ListGroup,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'

const OrderScreen = ({match}) => {

    const orderId=match.params.id

    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails

    const orderPay=useSelector(state=>state.orderPay)
    const {success:successPay}=orderPay

    const dispatch=useDispatch()

    const [SDKReady, setSDKReady] = useState(false)
    const [key, setkey] = useState(null)
    const [paid, setpaid] = useState(false)
    const [response,setresponse]=useState(null)
    const [flag,setflag]=useState(true)

    if(paid && response&&flag){
        dispatch({type:ORDER_PAY_RESET})
        dispatch(payOrder(order._id,{payment_id:response.razorpay_payment_id,signature:response.razorpay_signature}))
        // console.log(response)
        setflag(false)
    }

    const makePayment=async(e)=>{
        // console.log(key)
        e.preventDefault()
        var options = {
            key: key,
            amount: order.totalPrice*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: order.currency,
            order_id: order.order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            theme: {
                color: "#3399cc"
            },
            "handler": function (response){
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature)
                console.log()
                setpaid(true)
                setresponse(response)
            },
        }
        // console.log(options)
        var rzp1 = new window.Razorpay(options)
        rzp1.open()
    }

    useEffect(() => {

        const loadKey=async ()=>{
            const {data:clientID}=await axios.get('/api/config/razorpay')
            setkey(clientID)
        }
        loadKey()

        const addRazorPayScript=async()=>{    
            const script=document.createElement('script')
            script.type='text/javascript'
            script.src='https://www.checkout.razorpay.com/v1/checkout.js'
            script.async=true
            script.onload=()=>{
                setSDKReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay){
            dispatch({type:ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        }else if(!order.isPaid){
            addRazorPayScript()
            setSDKReady(true)
        }

    }, [successPay,orderId,order,dispatch])
    return loading?<Loader></Loader>:error?<Message variant="danger">{error}</Message>:
    <>
        <Row>
            <Col md={12} sm={6}>
                <h5>Order {order.order_id}</h5>
            </Col>
        </Row>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name : </strong>{order.user.name}</p>
                        <p><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address : </strong>
                            {order.shippingAddress.address},{order.shippingAddress.city}{' '},{order.shippingAddress.postalCode}{' '},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered?<Message variant="success">Delivered At {order.deliveredAt}</Message>:<Message variant="danger">Not Delivered</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method : </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid?<Message variant="success">Paid On {order.paidAt}</Message>:<Message variant="danger">Not Paid</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length===0?<Message>Order is empty</Message>:(
                            <ListGroup variant="flush">
                                {order.orderItems.map((item,index)=>(
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col >
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} X ${item.price} = ${item.qty*item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>{error?<Message variant="danger"></Message>:null}</ListGroup.Item>
                        {
                            !order.isPaid&&(
                                <ListGroup.Item>
                                    {/* {!loadingPay &&<Loader></Loader>} */}
                                    {!SDKReady?<Loader></Loader>:(
                                        <Button onClick={makePayment}>Pay</Button>
                                    )}
                                </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen
