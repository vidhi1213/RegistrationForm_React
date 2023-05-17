
import React,{useState,useEffect,useRef} from 'react'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText,Table } from 'reactstrap';

const Step2 = (props) => {
    const {user,gender,form2Validator} = props
    console.log("props step2",form2Validator);
    return (
            <Col sm="12" md="6" >
                <FormGroup>
                    <div>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="text" name="email" value={user?.email} placeholder="Enter Email id" onChange={props.handleChange} />
                        {form2Validator.current.message('Email', user?.email, 'required|email')}

                    </div>
                </FormGroup> 
                <FormGroup>
                    <Label for="exampleFile">Profile Picture</Label>
                    <Row>
                        <Col sm="8">
                            <Input type="file" name="file" id="exampleFile"    />
                            <FormText color="muted">
                            This is some placeholder block-level help text for the above input.
                            It's a bit lighter and easily wraps to a new line.
                            </FormText>
                        </Col>
                        <Col sm="4">
                            
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup tag="fieldset">
                    <Label>Gender</Label>
                    {
                        gender.map((gen,i) => {
                            return(
                                    <FormGroup key={i}>
                                        <Label>
                                            <Input type="radio" name={gen.name} value={gen.value} onChange={props.handleChange} checked={user.gender === gen.value} />{' '} {gen.label}
                                        </Label>
                                    </FormGroup>
                            )
                        })
                    }
                </FormGroup>
            </Col>
    )
}
export default Step2