import React,{useState} from 'react'
import {Form,Col, Button} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyWord, setkeyWord] = useState('')

    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }else{
            history.push('/')
        }
    }

    return (
        <>
            <Form onSubmit={submitHandler} inline>
                <Form.Control type="text" name="q" onChange={(e)=>{setkeyWord(e.target.value)}} placeholder="Search Items ..." className="mr-sm-2 ml-sm-5">

                </Form.Control>
                <Button type="submit" variant="outline-success" className="p-2">Search</Button>
            </Form>
        </>
    )
}

export default SearchBox
