
import React,{useState,useEffect,useRef} from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';

const Step3 = (props) => {
    const {user,form3Validator} = props

console.log("33",form3Validator)
    return (
        <Col sm="12" md="6" >
            <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword"  placeholder="*******" onChange={props.handleChange}/>
                {form3Validator.current.message('password', user?.password, 'required')}
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Confirm Password</Label>
                <Input type="password" name="confirmpass"  id="examplePassword" placeholder="*******" onChange={props.handleChange} />
                {form3Validator.current.message('confirmpassword', user?.confirmpass, 'required')}

            </FormGroup>
            
        </Col>
    )
}
export default Step3