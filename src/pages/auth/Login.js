import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Link} from 'react-router-dom'
import {sendEvent, getEvent, SucessAlert, ErrorAlert} from 'services/apiservices'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

let sub;
export default function Login() {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [userData, setuserData] = useState({email:'',password:''})
    const InputChange = (e) => {
        setuserData({...userData,[e.target.name] : e.target.value })
    }
    const [token,SetToken] = useState('')

    const [allUser] = useState(useSelector((state)=>state.users.users))
console.log("all",allUser);
    useEffect(() => {
        sub = getEvent((data) => {
            switch (data.event) {
                case 'chatDemo|login':
                    if(!data.error){
                        cookies.set('Token', data?.data?.token, { path: '/' });
                        // cookies.set('senderId', data?.data?.user?._id, { path: '/' });
                        dispatch({type:'SET_SENDER_ID',sendId:data?.data?.user?._id})
                        SetToken(data?.data?.token)
                        navigate(`/home`);
                        SucessAlert("Account Create Success Fully !!")
                        let auth = { token:data?.data?.token }
                        sendEvent('authentication',auth)
                    }else{
                        ErrorAlert( data.data.error)
                    }
                    break;
                default:
                    break;
            }
        })
        return (() => {
            sub?.unsubscribe()
        })   
     }, [])
     
     const valid = () =>{
           let findUser = allUser.find(item => (item.email === userData.email && item.password === userData.password))
        console.log('size',findUser);
        return findUser && findUser !== undefined ? true :false
    }
    const SubmitForm = (e) => {
        e.preventDefault();
        console.log("userData",userData);
        if(valid()){
            let data = {
                email: userData.email,
                password:userData.password
            }
            cookies.set('login-user', data ,{})
            navigate('/home');
            SucessAlert("Account Create Success Fully !!")
            sendEvent('chatDemo|login',data)
        }
       
    }

    return (
        <Container className="d-flex align-items-center justify-content-center">
            <div className="w-100">
                <Row className="align-items-center justify-content-center">
                    <Col sm="8" md="4">
                        <h1 className="text-center">Login</h1>
                    </Col>
                </Row>
                <Row className="align-items-center justify-content-center">
                    <Col sm="8" md="4">
                        <FormGroup>
                            <Label >Email</Label>
                            <Input type="email" name="email" value={userData.email} placeholder="abc@gmail.com" onChange={(e) => InputChange(e)} />
                        </FormGroup>
                        <FormGroup>
                            <Label >Password</Label>
                            <Input type="password" name="password" value={userData.password}  placeholder="*******" onChange={(e) => InputChange(e)}/>
                        </FormGroup>
                        <div className="text-end">
                            <Link to="/register" >Create Account</Link>
                        </div>
                        <Button onClick={(e)=> SubmitForm(e)}>Submit</Button>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}
