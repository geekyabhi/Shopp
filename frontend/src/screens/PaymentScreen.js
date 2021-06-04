import React, { useState} from 'react'
import { Form, Button ,Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const PaymentScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const dispatch=useDispatch()

    const [paymentMethod, setpaymentMethod] = useState('Paypal')

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                </Form.Group>
                <Col>
                    <Form.Check type="radio" label="PayPal or Credit Card" id="PayPaL" name="paymentMethod" value="PayPal" checked onChange={(e)=>{setpaymentMethod(e.target.value)}}>
                    </Form.Check>
                </Col>
                <Button type='submit' variant='primary' className="mt-4">Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
