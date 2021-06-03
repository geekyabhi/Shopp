import React, { useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {

    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    const dispatch=useDispatch()

    const [address, setaddress] = useState(shippingAddress.address)
    const [city, setcity] = useState(shippingAddress.city)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    const [country, setcountry] = useState(shippingAddress.country)


    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        history.push('/payments')
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e)=>setaddress(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e)=>setcity(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalcode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e)=>setpostalCode(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        required
                        onChange={(e)=>setcountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
