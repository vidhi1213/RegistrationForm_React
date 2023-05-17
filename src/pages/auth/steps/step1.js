
import React,{useState,useEffect,useRef} from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';

const Step1 = (props) => {
    const {user,form1Validator} = props;
    console.log("props step1",props)
    return (
        <Col sm="12" md="6">
            <FormGroup>
                <Label for="exampleEmail">First Name</Label>
                <Input type="text" name="fname" value={user?.fname} placeholder="First Name" onChange={props.handleChange} />
                {form1Validator.current.message('FirstName', user?.fname, `required`)}

            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Last Name</Label>
                <Input type="text" name="lname" value={user?.lname} placeholder="Last Name" onChange={props.handleChange} />
                {form1Validator.current.message('LastName', user?.lname, `required`)}

            </FormGroup> 
            <FormGroup>
                <Label for="exampleEmail">Phone</Label>
                <Input type="text" name="phone" value={user?.phone} placeholder="99999999999" onChange={props.handleChange} />
                {form1Validator.current.message('Phone', user?.phone, `required|`)}

            </FormGroup> 
        </Col>
    )
}
export default Step1